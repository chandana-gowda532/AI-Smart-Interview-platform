from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# USER MODEL
class UserData(BaseModel):
    name: str
    email: str
    role: str


# HOME ROUTE
@app.get("/")
def home():
    return {
        "message": "AI Smart Interview Backend Running"
    }


# SAVE USER ROUTE
@app.post("/save-user")
def save_user(user: UserData):

    return {
        "message": "User saved successfully",
        "user": user
    }


# QUESTIONS ROUTE
@app.get("/questions/{category}")
def get_questions(category: str):

    questions_data = {

        "python": [
            "What is Python?",
            "Explain OOP concepts",
            "What is list comprehension?",
            "Difference between list and tuple?",
            "Explain decorators in Python"
        ],

        "sql": [
            "What is JOIN?",
            "Difference between DELETE and TRUNCATE?",
            "What is normalization?",
            "Explain primary key",
            "What is foreign key?"
        ],

        "hr": [
            "Tell me about yourself",
            "Why should we hire you?",
            "What are your strengths?",
            "Describe a challenge you faced",
            "Where do you see yourself in 5 years?"
        ]
    }

    return questions_data.get(category.lower(), [])