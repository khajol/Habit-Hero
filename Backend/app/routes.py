# backend/app/routes.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from . import schemas, crud
from .database import get_db

router = APIRouter()

@router.post("/habits", response_model=schemas.HabitResponse)
def create_habit(habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    return crud.create_habit(db, habit)

@router.get("/habits", response_model=List[schemas.HabitResponse])
def list_habits(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_habits(db, skip=skip, limit=limit)

@router.get("/habits/{habit_id}", response_model=schemas.HabitResponse)
def get_habit(habit_id: int, db: Session = Depends(get_db)):
    result = crud.get_habit(db, habit_id)
    if not result:
        raise HTTPException(status_code=404, detail="Habit not found")
    return result

@router.put("/habits/{habit_id}", response_model=schemas.HabitResponse)
def update_habit(habit_id: int, habit_in: schemas.HabitCreate, db: Session = Depends(get_db)):
    updated = crud.update_habit(db, habit_id, habit_in)
    if not updated:
        raise HTTPException(status_code=404, detail="Habit not found")
    return updated

@router.delete("/habits/{habit_id}")
def delete_habit(habit_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_habit(db, habit_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Habit not found")
    return {"detail": "Deleted"}

# Check-ins
@router.post("/habits/{habit_id}/checkins", response_model=schemas.CheckinResponse)
def add_checkin(habit_id: int, checkin: schemas.CheckinCreate, db: Session = Depends(get_db)):
    if not crud.get_habit(db, habit_id):
        raise HTTPException(status_code=404, detail="Habit not found")
    return crud.create_checkin(db, habit_id, checkin)

@router.get("/habits/{habit_id}/checkins", response_model=List[schemas.CheckinResponse])
def get_checkins(habit_id: int, db: Session = Depends(get_db)):
    if not crud.get_habit(db, habit_id):
        raise HTTPException(status_code=404, detail="Habit not found")
    return crud.get_checkins_by_habit(db, habit_id)

# Analytics
@router.get("/analytics/{habit_id}")
def analytics(habit_id: int, db: Session = Depends(get_db)):
    stats = crud.compute_analytics(db, habit_id)
    if not stats:
        raise HTTPException(status_code=404, detail="Habit not found")
    return stats