# Mission Control

A geospatial web application for tracking team members on a map.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Mapping:** MapLibre GL JS
- **Backend:** FastAPI + Python (coming soon)
- **Database:** PostgreSQL + PostGIS (coming soon)

## Features

- [x] Interactive map display
- [x] Click to add markers
- [x] Marker popups with coordinates
- [x] Sidebar with marker list
- [x] Click marker in list to fly to location
- [ ] Layer toggle (show/hide markers)
- [ ] Multiple map styles
- [ ] Backend API integration
- [ ] PostGIS spatial queries
- [ ] Draw polygons to search within
- [ ] Offline support

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mission-control.git
cd mission-control

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## Project Structure

```
mission-control/
├── frontend/           # React + TypeScript + Vite
│   ├── src/
│   │   ├── App.tsx    # Main application component
│   │   ├── main.tsx   # Entry point
│   │   └── index.css  # Global styles
│   └── package.json
├── backend/           # FastAPI (coming soon)
└── README.md
```

## License

MIT
