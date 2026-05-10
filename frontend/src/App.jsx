import React, { useState } from "react";

function App() {
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const categories = ["python", "sql", "hr", "powerbi"];

  const startInterview = async (cat) => {
    setCategory(cat);

    const response = await fetch(
      `http://127.0.0.1:8000/questions/${cat}`
    );

    const data = await response.json();
    setQuestions(data);
  };

  const nextQuestion = () => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    setAnswer("");

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = answers.filter((a) => a.length > 5).length;

  return (
    <div
      style={{
        backgroundColor: "#001a66",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1>AI Smart Interview Platform</h1>

      {!category && (
        <div>
          <h2>Select Interview Category</h2>

          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => startInterview(cat)}
              style={{
                margin: "10px",
                padding: "15px 25px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {questions.length > 0 && !showResult && (
        <div
          style={{
            background: "white",
            color: "black",
            width: "70%",
            margin: "30px auto",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <h2>
            Question {currentQuestion + 1} of {questions.length}
          </h2>

          <h3>{questions[currentQuestion]}</h3>

          <textarea
            rows="5"
            cols="50"
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{
              width: "90%",
              padding: "10px",
              marginTop: "20px",
            }}
          />

          <br />

          <button
            onClick={nextQuestion}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#001a66",
              color: "white",
              cursor: "pointer",
            }}
          >
            Next Question
          </button>
        </div>
      )}

      {showResult && (
        <div
          style={{
            background: "white",
            color: "black",
            width: "60%",
            margin: "40px auto",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <h2>Interview Completed</h2>

          <h3>
            Your Score: {score} / {questions.length}
          </h3>

          {score === questions.length ? (
            <h2>Excellent Performance</h2>
          ) : score >= 2 ? (
            <h2>Good Performance</h2>
          ) : (
            <h2>Needs Improvement</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default App;