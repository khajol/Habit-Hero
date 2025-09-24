from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    frequency = Column(String, nullable=False)  # daily / weekly
    category = Column(String, nullable=False)   # health, work, learning
    start_date = Column(Date, nullable=False)

    checkins = relationship("Checkin", back_populates="habit")

class Checkin(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"))
    date = Column(Date, nullable=False)
    note = Column(String)

    habit = relationship("Habit", back_populates="checkins")