import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

// Tip za marker podatke
type MarkerData = {
  id: number
  lng: number
  lat: number
}

// Stilovi mape (van funkcije - OK jer nije hook)
const MAP_STYLES = {
  streets: {
    name: 'Ulice',
    url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
  },
  dark: {
    name: 'Tamna',
    url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
  }
}

function App() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])
  const [markers, setMarkers] = useState<MarkerData[]>([])
  const [showMarkers, setShowMarkers] = useState(true)
  const [currentStyle, setCurrentStyle] = useState<keyof typeof MAP_STYLES>('streets')
  const [units, setUnits] = useState<any[]>([])

  // Fetch jedinice sa API-ja
  useEffect(() => {
    fetch('https://mission-control-production-284f.up.railway.app/api/units')
      .then(res => res.json())
      .then(data => {
        setUnits(data.features)
      })
  }, [])

  // Prikaži jedinice na mapi
  useEffect(() => {
    if (!mapRef.current || units.length === 0) return

    units.forEach(unit => {
      const [lng, lat] = unit.geometry.coordinates
      const { name, status } = unit.properties

      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(`<strong>${name}</strong><br>Status: ${status}`)

      new maplibregl.Marker({ color: status === 'active' ? '#27ae60' : '#f39c12' })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapRef.current!)
    })
  }, [units])

  useEffect(() => {
    if (!mapContainer.current) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLES[currentStyle].url,
      center: [20.52, 43.14],
      zoom: 12
    })

    mapRef.current = map

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat
      const id = Date.now()

      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(`
          <strong>Marker ${markersRef.current.length + 1}</strong><br>
          Lng: ${lng.toFixed(4)}<br>
          Lat: ${lat.toFixed(4)}
        `)

      const marker = new maplibregl.Marker({ color: '#FF0000' })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map)

      markersRef.current.push(marker)
      setMarkers(prev => [...prev, { id, lng, lat }])
    })

    return () => map.remove()
  }, [currentStyle])

  // Toggle vidljivost markera
  useEffect(() => {
    markersRef.current.forEach(marker => {
      marker.getElement().style.display = showMarkers ? 'block' : 'none'
    })
  }, [showMarkers])

  const clearMarkers = () => {
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []
    setMarkers([])
  }

  const flyToMarker = (lng: number, lat: number) => {
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: 14
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <header style={{
        padding: '15px',
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Mission Control</h1>
      </header>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Sidebar */}
        <aside style={{
          width: '250px',
          backgroundColor: '#ecf0f1',
          padding: '15px',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h3 style={{ margin: 0 }}>Markeri ({markers.length})</h3>
            <button
              onClick={clearMarkers}
              style={{
                padding: '5px 10px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Obriši sve
            </button>
          </div>

          {/* Checkbox za toggle markera */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            cursor: 'pointer',
            padding: '8px',
            backgroundColor: 'white',
            borderRadius: '4px'
          }}>
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={(e) => setShowMarkers(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Prikaži markere
          </label>

          <div style={{ marginBottom: '15px' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '12px' }}>Stil mape:</p>
            {Object.entries(MAP_STYLES).map(([key, style]) => (
              <label key={key} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 8px',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name="mapStyle"
                  checked={currentStyle === key}
                  onChange={() => setCurrentStyle(key as keyof typeof MAP_STYLES)}
                  style={{ marginRight: '8px' }}
                />
                {style.name}
              </label>
            ))}
          </div>

          {/* Lista markera */}
          {markers.length === 0 ? (
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              Klikni na mapu da dodaš marker
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {markers.map((m, index) => (
                <li
                  key={m.id}
                  onClick={() => flyToMarker(m.lng, m.lat)}
                  style={{
                    padding: '10px',
                    marginBottom: '8px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    opacity: showMarkers ? 1 : 0.5
                  }}
                >
                  <strong>Marker {index + 1}</strong>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                    {m.lng.toFixed(4)}, {m.lat.toFixed(4)}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Forma za novu jedinicu */}
          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'white',
          borderRadius: '4px' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '12px' }}>Nova
          jedinica:</p>
            <input
              type="text"
              placeholder="Ime"
              id="unitName"
              style={{ width: '100%', padding: '5px', marginBottom: '5px', boxSizing:
          'border-box' }}
            />
            <select id="unitStatus" style={{ width: '100%', padding: '5px', marginBottom:
          '5px' }}>
              <option value="active">Active</option>
              <option value="idle">Idle</option>
            </select>
            <button
              onClick={() => {
                const name = (document.getElementById('unitName') as
          HTMLInputElement).value
                const status = (document.getElementById('unitStatus') as
          HTMLSelectElement).value
                const center = mapRef.current?.getCenter()
                if (!name || !center) return

                fetch('https://mission-control-production-284f.up.railway.app/api/units', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, status, lng: center.lng, lat: center.lat })
                })
                  .then(res => res.json())
                  .then(() => window.location.reload())
              }}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Dodaj na centar mape
            </button>
          </div>







          {/* API Jedinice */}
          <h3 style={{ margin: '20px 0 10px 0', borderTop: '1px solid #bdc3c7', paddingTop: '15px' }}>
            Jedinice ({units.length})
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {units.map((unit) => (
              <li
                key={unit.properties.id}
                onClick={() => flyToMarker(unit.geometry.coordinates[0], unit.geometry.coordinates[1])}
                style={{
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderLeft: `4px solid ${unit.properties.status === 'active' ? '#27ae60' : '#f39c12'}`
                }}
              >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:
              'center' }}>
                <strong>{unit.properties.name}</strong>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    fetch(`https://mission-control-production-284f.up.railway.app/api/units/${unit.properties.id}`, { method:
              'DELETE' })
                      .then(() => window.location.reload())
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '10px'
                  }}
                >
                  X
                </button>
              </div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                  Status: <span style={{ color: unit.properties.status === 'active' ? '#27ae60' : '#f39c12' }}>
                    {unit.properties.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mapa */}
        <div
          ref={mapContainer}
          style={{ flex: 1, position: 'relative' }}
        />
      </div>
    </div>
  )
}

export default App
