# Mission Control - Deploy Status

## Datum: 7. Februar 2026

---

## BACKEND DEPLOY ✅ ZAVRŠENO

**URL:** https://mission-control-production-284f.up.railway.app

**API Endpoints:**
- `GET /` → `{"message": "Mission Control API"}`
- `GET /api/units` → Vraća sve jedinice iz baze
- `POST /api/units` → Kreira novu jedinicu
- `DELETE /api/units/{id}` → Briše jedinicu

**Railway kredencijali:**
- Projekat: amused-dedication
- Backend servis: mission-control
- Baza servis: postgis
- Start Command: `sh -c "python -m uvicorn app.main:app --host 0.0.0.0 --port \$PORT"`

---

## BAZA (PostGIS) ✅ ZAVRŠENO

**Interni URL (za backend):**
```
postgresql://postgres:postgres123@postgis.railway.internal:5432/mission_control
```

**Javni URL (za pristup spolja):**
```
postgresql://postgres:postgres123@gondola.proxy.rlwy.net:35901/mission_control
```

**Tabela:**
```sql
CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    status VARCHAR(20),
    location GEOGRAPHY(POINT, 4326)
);
```

---

## FRONTEND DEPLOY ⏳ OSTALO

**Sledeći koraci:**
1. Idi na https://vercel.com
2. Login with GitHub
3. Import mission-control repo
4. Root Directory: `frontend`
5. Dodaj env varijablu: `VITE_API_URL=https://mission-control-production-284f.up.railway.app`
6. Deploy

---

## FAJLOVI PROJEKTA

```
mission-control/
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # React + MapLibre
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI endpoints
│   │   └── __init__.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env                 # Lokalni credentials (NE UKLJUČEN u git)
├── docker-compose.yml       # Lokalni PostGIS
├── .gitignore
├── DEPLOY_STATUS.md         # Ovaj fajl
└── README.md
```

---

## UKUPAN PROGRES

```
FAZA 0   Git/GitHub                    [██████████] 100%  ✅
FAZA 1   React + MapLibre              [██████████] 100%  ✅
FAZA 2   Backend API                   [██████████] 100%  ✅
FAZA 3   PostGIS + Docker              [██████████] 100%  ✅
FAZA 4   React Intermediate            [░░░░░░░░░░]   0%
FAZA 5   React Advanced                [░░░░░░░░░░]   0%
FAZA 6   Testing                       [░░░░░░░░░░]   0%
FAZA 7   Offline + PWA                 [░░░░░░░░░░]   0%
FAZA 8   Deploy                        [████████░░]  80%  ← OVDE SMO
FAZA 9   Polish + Interview            [░░░░░░░░░░]   0%

UKUPNO: ~70%
```

---

## ČEMU SLUŽI OVA APLIKACIJA?

### Realne primene:
- **Fleet Management** - praćenje vozila (Glovo, Wolt, DHL)
- **Field Service** - tehničari na terenu
- **Hitne službe** - ambulante, policija
- **Poljoprivreda** - traktori, parcele
- **Komunalne službe** - vodovod, struja

### Kako praćenje radi:

```
UREĐAJ (telefon/GPS)          BACKEND              FRONTEND
        │                         │                    │
        │  Šalje lokaciju        │                    │
        │  svakih 10 sek         │                    │
        ├────────────────────────►│                    │
        │                         │  Čuva u PostGIS   │
        │                         │                    │
        │                         │  Frontend pita    │
        │                         │◄───────────────────┤
        │                         │                    │
        │                         │  Šalje nove       │
        │                         │  pozicije         │
        │                         ├───────────────────►│
        │                         │                    │
        │                         │                    │  Ažurira mapu
```

### Tvoja app je DEMO koja pokazuje:
- ✅ Prikazivanje na mapi (MapLibre)
- ✅ Čuvanje u bazi (PostGIS)
- ✅ REST API (FastAPI)
- ✅ Frontend (React/TypeScript)
- ✅ Deploy na cloud (Railway)

Za pravo praćenje dodalo bi se:
- GPS slanje sa mobilne app
- WebSocket za instant update
- Osvežavanje mape svakih 5 sekundi

---

## ZA NASTAVAK

### Minimalno za intervju (~1h):
1. ⏳ Frontend deploy na Vercel (15 min)
2. ⏳ README.md sa screenshotom (30 min)
3. ⏳ Test da sve radi (15 min)

### Za mid-level utisak:
- Custom hooks (useUnits, useMap)
- Filter/Search funkcije
- Osnovni testovi

### Za senior nivo:
- Auth (JWT login)
- Real-time (WebSocket)
- Clustering (10,000+ tačaka)
- CI/CD (GitHub Actions)

---

## LOKALNO POKRETANJE

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

# Otvori: http://localhost:5173
```

---

*Poslednje ažuriranje: 7. Februar 2026, 23:45*
