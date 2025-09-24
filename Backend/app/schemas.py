# backend/app/schemas.py
from pydantic import BaseModel
from enum import Enum
from datetime import date
from typing import Optional, List

class Frequency(str, Enum):
    daily = "daily"
    weekly = "weekly"

class CheckinCreate(BaseModel):
    date: date
    note: Optional[str] = None

class CheckinResponse(BaseModel):
    id: int
    habit_id: int
    date: date
    note: Optional[str] = None

    class Config:
        orm_mode = True

class HabitCreate(BaseModel):
    name: str
    frequency: Frequency
    category: str
    start_date: date

class HabitResponse(BaseModel):
    id: int
    name: str
    frequency: Frequency
    category: str
    start_date: date
    checkins: List[CheckinResponse] = []

    class Config:
        orm_mode = True