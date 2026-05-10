from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

questions_data = {
    "python": [
        "What is Python?",
        "Difference between list and tuple?",
        "What is OOPs?"
    ],

    "sql": [
        "What is SQL?",
        "Explain joins",
        "What is primary key?"
    ],

    "hr": [
        "Tell me about yourself",
        "Why should we hire you?",
        "What are your strengths?"
    ],

    "powerbi": [
        "What is Power BI?",
        "What is dashboard?",
        "What is DAX?"
    ]
}

@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.get("/questions/{category}")
def get_questions(category: str):
    return questions_data.get(category.lower(), [])