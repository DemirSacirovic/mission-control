  # Mission Control                                                              
                                                                                 
  Geospatial fleet tracking application for monitoring units on a map.           
                                                                                 
  ## Live Demo                                                                   
                                                                                 
  - **Frontend:** https://mission-control-five-weld.vercel.app                   
  - **API:** https://mission-control-production-284f.up.railway.app/api/units    
                                                                                 
  ## Tech Stack                                                                  
                                                                                 
  - **Frontend:** React 18 + TypeScript + Vite + MapLibre GL JS                  
  - **Backend:** FastAPI + Python                                                
  - **Database:** PostgreSQL + PostGIS                                           
  - **Hosting:** Vercel (frontend) + Railway (backend + database)                
                                                                                 
  ## Features                                                                    
                                                                                 
  - [x] Interactive map with MapLibre GL                                         
  - [x] Add/delete units with markers                                            
  - [x] Unit status tracking (active/idle)                                       
  - [x] Click to fly to location                                                 
  - [x] Multiple map styles (light/dark)                                         
  - [x] REST API (CRUD operations)                                               
  - [x] PostGIS spatial database                                                 
  - [x] Cloud deployment                                                         
                                                                                 
  ## Local Development                                                           
                                                                                 
  ```bash                                                                        
  # Database (Docker)                                                            
  docker-compose up -d                                                           
                                                                                 
  # Backend                                                                      
  cd backend                                                                     
  source venv/bin/activate                                                       
  python -m uvicorn app.main:app --reload                                        
                                                                                 
  # Frontend                                                                     
  cd frontend                                                                    
  npm install                                                                    
  npm run dev                                                                    
                                                                                 
  API Endpoints                                                                  
  ┌────────┬─────────────────┬───────────────┐                                   
  │ Method │    Endpoint     │  Description  │                                   
  ├────────┼─────────────────┼───────────────┤                                   
  │ GET    │ /api/units      │ Get all units │                                   
  ├────────┼─────────────────┼───────────────┤                                   
  │ POST   │ /api/units      │ Create unit   │                                   
  ├────────┼─────────────────┼───────────────┤                                   
  │ DELETE │ /api/units/{id} │ Delete unit   │                                   
  └────────┴─────────────────┴───────────────┘                                   
  License                                                                        
                                                                                 
  MIT
