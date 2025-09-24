# backend/main.py
from fastapi.middleware.cors import CORSMiddleware


from fastapi import FastAPI
from app.database import init_db
from app.routes import router as api_router

app = FastAPI(title="Habit Hero API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

app.include_router(api_router, prefix="/api", tags=["habit-hero"])

@app.get("/")
def read_root():
    return {"message": "Habit Hero backend running 🚀"}