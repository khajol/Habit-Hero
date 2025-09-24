# backend/app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas
from datetime import date, timedelta
import math
import calendar
from collections import Counter

def create_habit(db: Session, habit: schemas.HabitCreate):
    db_habit = models.Habit(
        name=habit.name,
        frequency=habit.frequency.value,
        category=habit.category,
        start_date=habit.start_date
    )
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit

def get_habits(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Habit).offset(skip).limit(limit).all()

def get_habit(db: Session, habit_id: int):
    return db.query(models.Habit).filter(models.Habit.id == habit_id).first()

def update_habit(db: Session, habit_id: int, habit_in: schemas.HabitCreate):
    habit = get_habit(db, habit_id)
    if not habit:
        return None
    habit.name = habit_in.name
    habit.frequency = habit_in.frequency.value
    habit.category = habit_in.category
    habit.start_date = habit_in.start_date
    db.add(habit)
    db.commit()
    db.refresh(habit)
    return habit

def delete_habit(db: Session, habit_id: int):
    habit = get_habit(db, habit_id)
    if not habit:
        return None
    db.delete(habit)
    db.commit()
    return habit

def create_checkin(db: Session, habit_id: int, checkin: schemas.CheckinCreate):
    db_checkin = models.Checkin(
        habit_id=habit_id,
        date=checkin.date,
        note=checkin.note
    )
    db.add(db_checkin)
    db.commit()
    db.refresh(db_checkin)
    return db_checkin

def get_checkins_by_habit(db: Session, habit_id: int):
    return db.query(models.Checkin).filter(models.Checkin.habit_id == habit_id).order_by(models.Checkin.date).all()

# Simple analytics: success_rate, total_checkins, expected_count, longest_streak, current_streak, best_day
def compute_analytics(db: Session, habit_id: int):
    habit = get_habit(db, habit_id)
    if not habit:
        return None

    checkins = [c.date for c in get_checkins_by_habit(db, habit_id)]
    total_checkins = len(checkins)

    today = date.today()
    start = habit.start_date
    days_elapsed = (today - start).days + 1
    if days_elapsed < 1:
        expected = 0
    else:
        if habit.frequency == "daily":
            expected = days_elapsed
        else:  # weekly
            expected = math.ceil(days_elapsed / 7)

    success_rate = (total_checkins / expected * 100) if expected > 0 else 0

    # best day (weekday with most checkins)
    if checkins:
        weekdays = [d.weekday() for d in checkins]  # 0 Mon .. 6 Sun
        most_common = Counter(weekdays).most_common(1)[0][0]
        best_day = calendar.day_name[most_common]
    else:
        best_day = None

    # longest streak (daily => consecutive days; weekly => consecutive weeks with >=1 checkin)
    longest = 0
    current = 0
    if habit.frequency == "daily":
        if checkins:
            unique_dates = sorted(set(checkins))
            prev = None
            for d in unique_dates:
                if prev is None:
                    current = 1
                else:
                    if (d - prev).days == 1:
                        current += 1
                    else:
                        if current > longest: longest = current
                        current = 1
                prev = d
            longest = max(longest, current)
            # current_streak from today backwards
            cs = 0
            checkin_set = set(unique_dates)
            pointer = today
            while pointer in checkin_set:
                cs += 1
                pointer -= timedelta(days=1)
            current_streak = cs
        else:
            longest = 0
            current_streak = 0
    else:  # weekly
        if checkins:
            # map date -> ISO year-week number
            weeks = sorted({(d.isocalendar()[0], d.isocalendar()[1]) for d in checkins})
            prev = None
            current = 0
            for y,w in weeks:
                if prev is None:
                    current = 1
                else:
                    prev_y, prev_w = prev
                    # convert to a single index for easy difference: week_index = year*53 + week
                    if (y*53 + w) - (prev_y*53 + prev_w) == 1:
                        current += 1
                    else:
                        if current > longest: longest = current
                        current = 1
                prev = (y,w)
            longest = max(longest, current)
            # current_streak by checking current week and going backwards
            cs = 0
            week_set = {(d.isocalendar()[0], d.isocalendar()[1]) for d in checkins}
            cur_y, cur_w, _ = today.isocalendar()
            pointer_y, pointer_w = cur_y, cur_w
            while (pointer_y, pointer_w) in week_set:
                cs += 1
                # decrement week (handle year boundary)
                pointer_w -= 1
                if pointer_w == 0:
                    pointer_y -= 1
                    pointer_w = 52  # safe approximation (rare edge-case)
            current_streak = cs
        else:
            longest = 0
            current_streak = 0

    return {
        "habit_id": habit.id,
        "name": habit.name,
        "total_checkins": total_checkins,
        "expected_count": expected,
        "success_rate": round(success_rate, 2),
        "longest_streak": longest,
        "current_streak": current_streak,
        "best_day": best_day
    }