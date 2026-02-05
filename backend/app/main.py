from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

app = FastAPI(title="Mission Control API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    return psycopg2.connect(
        host="localhost",
        database="mission_control",
        user="standard"
    )

@app.get("/")
def root():
    return {"message": "Mission Control API"}

@app.get("/api/units")
def get_units():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, name, status,
               ST_X(location::geometry) as lng,
               ST_Y(location::geometry) as lat
        FROM units
    """)

    rows = cur.fetchall()
    cur.close()
    conn.close()

    features = []
    for row in rows:
        features.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [row[3], row[4]]},
            "properties": {"id": row[0], "name": row[1], "status": row[2]}
        })

    return {"type": "FeatureCollection", "features": features}
