import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from pydantic import BaseModel

app = FastAPI(title="Mission Control API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        return psycopg2.connect(database_url)
    return psycopg2.connect(
        host="localhost",
        port=5433,
        database="mission_control",
        user="postgres",
        password="postgres"
    )

class UnitCreate(BaseModel):
    name: str
    status: str
    lng: float
    lat: float

@app.post("/api/units")
def create_unit(unit: UnitCreate):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO units (name, status, location)
        VALUES (%s, %s, ST_MakePoint(%s, %s))
        RETURNING id
    """, (unit.name, unit.status, unit.lng, unit.lat))

    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {"id": new_id, "message": "Unit created"}

@app.delete("/api/units/{unit_id}")
def delete_unit(unit_id: int):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        DELETE FROM units WHERE id = %s
    """, (unit_id,))

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Unit deleted"}

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
