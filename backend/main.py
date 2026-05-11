from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import SessionLocal
from models import Question, User

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# USER DATA MODEL
# -----------------------------
class UserData(BaseModel):
    name: str
    email: str
    role: str


# -----------------------------
# SAVE USER API
# -----------------------------
@app.post("/save-user")
def save_user(user: UserData):

    db: Session = SessionLocal()

    new_user = User(
        name=user.name,
        email=user.email,
        role=user.role
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User saved successfully"
    }


# -----------------------------
# GET QUESTIONS BY CATEGORY
# -----------------------------
@app.get("/questions/{category}")
def get_questions(category: str):

    db: Session = SessionLocal()

    questions = db.query(Question).filter(
        Question.category == category
    ).all()

    return questions


# -----------------------------
# HOME API
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "AI Smart Interview Backend Running"
    }