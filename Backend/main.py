from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Habit Hero backend running 🚀"}