from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base

# Using SQLite (file stored locally as habithero.db)
DATABASE_URL = "sqlite:///./habithero.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
def init_db():
    Base.metadata.create_all(bind=engine)