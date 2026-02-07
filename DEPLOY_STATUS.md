# Mission Control - Deploy Status

## Datum: 6. Februar 2026

---

## DANAS URAĐENO ✅

| # | Zadatak | Status |
|---|---------|--------|
| 1 | requirements.txt popunjen | ✅ |
| 2 | Dockerfile kreiran | ✅ |
| 3 | backend/.env kreiran | ✅ |
| 4 | .gitignore (root) kreiran | ✅ |
| 5 | main.py (env varijable) | ✅ |
| 6 | Railway nalog | ✅ |
| 7 | PostGIS baza na Railway | ✅ |
| 8 | Tabela units + test podaci | ✅ |

---

## RAILWAY BAZA - KREDENCIJALI

```
Host: gondola.proxy.rlwy.net
Port: 35901
Database: mission_control
User: postgres
Password: postgres123

PUBLIC URL:
postgresql://postgres:postgres123@gondola.proxy.rlwy.net:35901/mission_control
```

### Kako se spojiti:
```bash
psql "postgresql://postgres:postgres123@gondola.proxy.rlwy.net:35901/mission_control"
```

---

## OSTALO ZA ZAVRŠITI DEPLOY (~20-30 min)

### Korak 1: Git push novih fajlova
```bash
cd ~/mission-control
git add .
git commit -m "Add Docker and env configuration for deployment"
git push
```

### Korak 2: Deploy Backend na Railway
1. Idi na https://railway.app/dashboard
2. Otvori projekat "amused-dedication"
3. Klikni "+ Create" → "GitHub Repo"
4. Izaberi mission-control repo
5. Podesi Root Directory: `backend`
6. Dodaj Environment Variable:
   - `DATABASE_URL` = `postgresql://postgres:postgres123@postgis.railway.internal:5432/mission_control`
7. Deploy!

### Korak 3: Deploy Frontend na Vercel
1. Idi na https://vercel.com
2. Login with GitHub
3. Import mission-control repo
4. Podesi Root Directory: `frontend`
5. Dodaj Environment Variable:
   - `VITE_API_URL` = (Railway backend URL)
6. Deploy!

---

## LOKALNO POKRETANJE (za razvoj)

```bash
# Terminal 1 - Docker baza
cd ~/mission-control
docker-compose up -d

# Terminal 2 - Backend
cd ~/mission-control/backend
source venv/bin/activate
python -m uvicorn app.main:app --reload

# Terminal 3 - Frontend
cd ~/mission-control/frontend
npm run dev
```

---

## FAJLOVI KOJE SMO KREIRALI/IZMENILI

### /backend/requirements.txt
```
fastapi==0.109.0
uvicorn==0.27.0
psycopg2-binary==2.9.9
python-dotenv==1.0.0
```

### /backend/Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### /backend/.env
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/mission_control
```

### /.gitignore (root)
```
.env
__pycache__/
venv/
.DS_Store
```

### /backend/app/main.py (izmene na vrhu)
```python
import os
from dotenv import load_dotenv
load_dotenv()

# ... ostatak koda ...

def get_db():
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        return psycopg2.connect(database_url)
    else:
        return psycopg2.connect(
            host="localhost",
            port=5433,
            database="mission_control",
            user="postgres",
            password="postgres"
        )
```

---

## UKUPAN PROGRES PROJEKTA

```
FAZA 0   Git/GitHub                    [██████████] 100%  ✅
FAZA 1   React + MapLibre              [██████████] 100%  ✅
FAZA 2   Backend API                   [██████████] 100%  ✅
FAZA 3   PostGIS + Docker              [██████████] 100%  ✅
FAZA 4   React Intermediate            [░░░░░░░░░░]   0%
FAZA 5   React Advanced                [░░░░░░░░░░]   0%
FAZA 6   Testing                       [░░░░░░░░░░]   0%
FAZA 7   Offline + PWA                 [░░░░░░░░░░]   0%
FAZA 8   Deploy                        [██████░░░░]  60%  ← OVDE SMO
FAZA 9   Polish + Interview            [░░░░░░░░░░]   0%

UKUPNO: ~65%
```

---

## KAKO PODIĆI NA SENIOR NIVO

### 1. Arhitektura koda

| Sad (Junior) | Senior nivo |
|--------------|-------------|
| Sve u App.tsx | Razdvojeno u komponente |
| Nema custom hooks | useUnits(), useMap() hooks |
| any tipovi | Striktni TypeScript tipovi |
| Nema error handling | Try/catch, Error Boundaries |

### 2. Napredne GIS funkcije

| Sad | Senior nivo |
|-----|-------------|
| Prikaži tačke | Clustering (grupiranje 1000+ tačaka) |
| Jedan layer | Više layera (jedinice, zone, rute) |
| Klik = marker | Crtanje poligona, linija |
| Statični podaci | Real-time tracking (WebSocket) |

### 3. Backend

| Sad | Senior nivo |
|-----|-------------|
| Osnovni CRUD | Autentikacija (JWT) |
| Bez validacije | Puna validacija + error handling |
| Bez testova | Pytest testovi (80%+ coverage) |
| Ručne migracije | Alembic migracije |

### 4. DevOps

| Sad | Senior nivo |
|-----|-------------|
| Ručni deploy | CI/CD (GitHub Actions) |
| Bez monitoringa | Logging, health checks |

### 5. Senior Features za dodati:

```
├── Auth (login/logout)
├── Role-based access (admin, viewer)
├── Real-time updates (WebSocket)
├── Clustering za 10,000+ tačaka
├── Drawing tools (crtaj zonu)
├── Export to GeoJSON/KML
├── Heatmape
├── Offline mode (PWA)
├── Unit tests (80%+)
└── CI/CD pipeline
```

### Realan plan za Senior nivo:

| Faza | Šta dodati | Efekat |
|------|-----------|--------|
| Sad | Završi deploy | Junior+ projekat, LIVE link |
| +1 nedelja | Auth + Testovi | Mid-level |
| +2 nedelje | Real-time + Clustering | Senior-level |
| +1 nedelja | CI/CD + Dokumentacija | Production-ready |

---

## SLEDEĆI PUT - NASTAVAK

Kad budeš spreman, samo reci "nastavi deploy" i završićemo:
1. Git push
2. Backend deploy
3. Frontend deploy

~20-30 minuta do LIVE projekta!

---

*Poslednje ažuriranje: 6. Februar 2026, 17:30*
