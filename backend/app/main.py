from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Mission Control API")

# Dozvoli frontend da pristupi API-ju
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Mission Control API"}

@app.get("/api/units")
def get_units():
    # Mock podaci - kasnije iz baze
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [20.52, 43.14]},
                "properties": {"name": "Alpha", "status": "active"}
            },
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [20.51, 43.15]},
                "properties": {"name": "Bravo", "status": "idle"}
            }
        ]
    }
