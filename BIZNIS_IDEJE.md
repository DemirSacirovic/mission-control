# Mission Control - Biznis Ideje

## Fleet Tracking / Praćenje Vozila

---

## KAKO PRAĆENJE RADI PREKO GRANICA

```
KAMION U SRBIJI          KAMION U MAĐARSKOJ         KAMION U NEMAČKOJ
      📍                        📍                         📍
      │                         │                          │
      ▼                         ▼                          ▼
   GPS šalje               GPS šalje                  GPS šalje
   (mobilni net)           (mobilni net)              (mobilni net)
      │                         │                          │
      └─────────────────────────┴──────────────────────────┘
                                │
                                ▼
                    TVOJ SERVER (Railway)
                                │
                                ▼
                    MENADŽER U KANCELARIJI
                    (vidi sve kamione na mapi)
```

**GPS radi SVUDA** - sateliti pokrivaju celu planetu. Samo treba internet (mobilni) da pošalje podatke serveru.

---

## FIRME KOJIMA TREBA PRAĆENJE (LOKALNO)

| Industrija | Primer | Zašto im treba |
|------------|--------|----------------|
| **Dostava** | Kurirske službe | Gde je paket? |
| **Građevina** | Kamioni sa šljunkom | Ko je koliko tura odvezao? |
| **Komunalne službe** | Đubretari | Da li su pokupili sve kontejnere? |
| **Taxi/Prevoz** | Taxi flota | Koji auto je najbliži? |
| **Poljoprivreda** | Traktori, kombajni | Da li radi ili stoji? |
| **Hladnjače** | Prevoz hrane | Temperatura + lokacija |
| **Tehnički servisi** | Majstori na terenu | Ko je najbliži klijentu? |

---

## KORISNI FEATURES

### 1. OSNOVNI

| Feature | Opis | Korist |
|---------|------|--------|
| **Live mapa** | Gde su vozila SAD | Uvid u realnom vremenu |
| **Status** | Aktivan/Neaktivan | Brz pregled flote |
| **Istorija** | Gde je bio juče | Provera rada |

### 2. ZA TRANSPORT/LOGISTIKU

| Feature | Opis | Korist |
|---------|------|--------|
| **Geofence** | Virtuelna ograda | Alert: "Kamion napustio depo" |
| **ETA** | Procena dolaska | "Stiže za 45 min" |
| **Ruta** | Planirana vs stvarna | Da li vozač skreće? |
| **Pauze** | Koliko je stajao | Zakonske pauze vozača |
| **Kilometraža** | Dnevna/mesečna | Za obračun goriva |

### 3. ZA CROSS-BORDER (međunarodni transport)

| Feature | Opis | Korist |
|---------|------|--------|
| **Prelaz granice** | Automatski detektuje | "Ušao u Mađarsku 14:32" |
| **Timezone** | Prikazuje lokalno vreme | Jasnoća u izveštajima |
| **Carina** | Dokumenti po zemlji | Podseti vozača |
| **Toll (putarina)** | Koja je ruta jeftinija | Ušteda |

### 4. ZA BEZBEDNOST

| Feature | Opis | Korist |
|---------|------|--------|
| **Brzina** | Alert za prebrzu vožnju | "Vozač prekoračio 120km/h" |
| **Harsh braking** | Naglo kočenje | Znak lošeg vozača |
| **Krađa** | Vozilo se pomera noću | Alarm vlasniku |
| **SOS dugme** | Vozač u problemu | Hitna pomoć |

### 5. ZA FINANSIJE

| Feature | Opis | Korist |
|---------|------|--------|
| **Gorivo** | Potrošnja po km | Otkriva krađu goriva |
| **Održavanje** | Podsetnik za servis | "Prošlo 10,000km - zamena ulja" |
| **Izveštaji** | PDF/Excel | Za računovodstvo |
| **Fakturisanje** | Po km ili satu | Automatski račun klijentu |

---

## PRIMER: GRAĐEVINSKA FIRMA

```
PROBLEM:
Firma ima 10 kamiona koji voze šljunak.
Šef ne zna da li su odvezli 5 ili 6 tura.
Vozači ponekad "skrenu" privatno.

REŠENJE SA TVOJOM APP:

1. Postavi GPS na svaki kamion
2. Definiši GEOFENCE:
   - Kamenolom (utovar)
   - Gradilište (istovar)

3. App automatski beleži:
   ✓ 08:15 - Kamion 1 ušao u kamenolom
   ✓ 08:45 - Kamion 1 napustio kamenolom
   ✓ 09:30 - Kamion 1 ušao na gradilište
   ✓ 09:45 - Kamion 1 napustio gradilište
   = 1 TURA ZAVRŠENA

4. Na kraju dana:
   Kamion 1: 6 tura, 180km
   Kamion 2: 5 tura, 150km
   ...

5. Šef TAČNO zna:
   - Ko koliko radi
   - Potrošnja goriva po turi
   - Ako neko skrene sa rute
```

---

## KAKO BI IZGLEDALA APP SA SVIM FEATURES

```
┌─────────────────────────────────────────────────────────┐
│  MISSION CONTROL - Fleet Management                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [MAPA]                              │ VOZILA (10)       │
│                                      │                   │
│     🚛 Kamion-01 (vozi)             │ 🟢 Kamion-01      │
│         ↓                            │    85 km/h        │
│     🚛 Kamion-02 (stoji)            │    Ruta: OK       │
│                                      │                   │
│     ⬡ Gradilište                    │ 🟡 Kamion-02      │
│       (geofence)                     │    Stoji 23min    │
│                                      │    ⚠️ Pauza?      │
│     ⬡ Depo                          │                   │
│       (geofence)                     │ 🔴 Kamion-03      │
│                                      │    OFFLINE        │
│                                      │                   │
├─────────────────────────────────────────────────────────┤
│  ALERTS:                                                 │
│  ⚠️ 10:32 - Kamion-05 prekoračio brzinu (127 km/h)      │
│  ✅ 10:28 - Kamion-01 stigao na gradilište               │
│  ⚠️ 10:15 - Kamion-03 izgubio signal                    │
└─────────────────────────────────────────────────────────┘
```

---

## HARDVER OPCIJE

| Opcija | Cena | Za koga |
|--------|------|---------|
| Mobilna app | Besplatno | Vozač ima telefon |
| OBD GPS uređaj | 30-100€ | Uključi u auto |
| Profesionalni tracker | 100-300€ | Kamioni, flote |

---

## BIZNIS MODEL

| Model | Kako funkcioniše |
|-------|------------------|
| **SaaS mesečno** | 10-50€ po vozilu/mesec |
| **Jednokratna licenca** | 500-2000€ + održavanje |
| **Enterprise** | Custom cena za velike flote |

---

## KONKURENCIJA

| Firma | Cena | Tržište |
|-------|------|---------|
| Fleetio | $5-10/vozilo | USA |
| Samsara | $30+/vozilo | Enterprise |
| GPS Tracky | 5-15€/vozilo | EU |
| Lokalni igrači | Razno | Srbija/region |

---

## TVOJA PREDNOST

```
✅ Možeš napraviti JEFTINIJE za lokalno tržište
✅ Možeš customizovati za specifičnu industriju
✅ Poznaješ jezik i regulativu regiona
✅ Direktan kontakt sa klijentima
```

---

## PLAN ZA BIZNIS

### Faza 1: MVP (1-2 meseca)
- Dodaj Auth (login)
- Napravi mobilnu app za vozača (React Native)
- Real-time tracking
- **Nađi 1-2 firme za BESPLATAN test**

### Faza 2: Validacija (1-2 meseca)
- Testiraj sa pravim vozilima
- Prikupi feedback
- Popravi bugove
- **Naplati prvom klijentu**

### Faza 3: Rast
- Marketing
- Više klijenata
- Više features

---

## SAVET

```
1. POČNI SA JEDNOM NIŠOM:
   - NE pravi "za sve"
   - Izaberi: građevina ILI dostava ILI taxi

2. NAĐI JEDNOG KLIJENTA:
   - Ponudi BESPLATNO 1 mesec
   - Nauči šta IM treba

3. DODAJ FEATURES PO POTREBI:
   - Ne pravi sve unapred
   - Klijent kaže "treba mi X" → dodaš X

4. CENA:
   - 10-15€ po vozilu mesečno za Srbiju
   - To je 100-150€ za firmu sa 10 vozila
   - Njima uštedi MNOGO više
```

---

## ŠTA TREBA TEHNIČKI DODATI

| Feature | Tehnologija | Težina |
|---------|-------------|--------|
| Auth (login) | JWT + bcrypt | Medium |
| Mobile app za vozača | React Native | Medium |
| Real-time | WebSocket | Medium |
| Geofence | PostGIS ST_Contains | Easy |
| Istorija ruta | PostGIS + LineString | Easy |
| Alerts | Background job | Medium |
| Izveštaji PDF | ReportLab / WeasyPrint | Easy |

---

*Kreirano: 7. Februar 2026*
