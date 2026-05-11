import { useEffect, useState } from "react";

function App() {

  // USER DETAILS
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [userSaved, setUserSaved] = useState(false);

  // QUESTIONS
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ANSWERS
  const [answer, setAnswer] = useState("");

  // TIMER
  const [timer, setTimer] = useState(60);

  // SCORE
  const [score, setScore] = useState(0);

  // RESULT
  const [interviewFinished, setInterviewFinished] =
    useState(false);

  // TIMER LOGIC
  useEffect(() => {

    if (
      userSaved &&
      questions.length > 0 &&
      timer > 0 &&
      !interviewFinished
    ) {

      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (timer === 0) {
      finishInterview();
    }

  }, [timer, questions, userSaved, interviewFinished]);

  // SAVE USER
  const saveUser = async () => {

    await fetch(
      "http://127.0.0.1:8000/save-user",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          role,
        }),
      }
    );

    setUserSaved(true);
  };

  // FETCH QUESTIONS
  const fetchQuestions = async (subject) => {

    const response = await fetch(
      'https://ai-smart-interview-platform-k601.onrender.com'
    );

    const data = await response.json();

    setQuestions(data);

    setCurrentIndex(0);

    setTimer(60);

    setInterviewFinished(false);

    setScore(0);
  };

  // NEXT QUESTION
  const nextQuestion = () => {

    if (answer.length > 10) {
      setScore(score + 10);
    }

    setAnswer("");

    if (currentIndex < questions.length - 1) {

      setCurrentIndex(currentIndex + 1);

    } else {

      finishInterview();
    }
  };

  // PREVIOUS QUESTION
  const previousQuestion = () => {

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // FINISH INTERVIEW
  const finishInterview = () => {
    setInterviewFinished(true);
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#071952",
        color: "white",
        padding: "40px",
        textAlign: "center",
      }}
    >

      <h1>AI Smart Interview Platform</h1>

      {/* USER FORM */}

      {!userSaved && (

        <div
          style={{
            background: "white",
            color: "black",
            width: "50%",
            margin: "50px auto",
            padding: "30px",
            borderRadius: "15px",
          }}
        >

          <h2>User Details</h2>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Enter Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={saveUser}
            style={buttonStyle}
          >
            Continue
          </button>

        </div>
      )}

      {/* TOPIC SELECTION */}

      {userSaved && questions.length === 0 && (

        <div>

          <h2>Select Interview Topic</h2>

          <button
            onClick={() => fetchQuestions("python")}
            style={buttonStyle}
          >
            Python
          </button>

          <button
            onClick={() => fetchQuestions("sql")}
            style={buttonStyle}
          >
            SQL
          </button>

          <button
            onClick={() => fetchQuestions("hr")}
            style={buttonStyle}
          >
            HR
          </button>

        </div>
      )}

      {/* QUESTIONS */}

      {questions.length > 0 && !interviewFinished && (

        <div
          style={{
            background: "white",
            color: "black",
            width: "70%",
            margin: "50px auto",
            padding: "30px",
            borderRadius: "15px",
          }}
        >

          <h2>
            Time Remaining: {timer} seconds
          </h2>

          <h2>
            Question {currentIndex + 1}
            {" "}of{" "}
            {questions.length}
          </h2>

          <h3 style={{ marginTop: "30px" }}>
            {questions[currentIndex].question}
          </h3>

          <textarea
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{
              width: "90%",
              height: "120px",
              marginTop: "30px",
              padding: "15px",
              fontSize: "16px",
              borderRadius: "10px",
            }}
          />

          <div style={{ marginTop: "30px" }}>

            <button
              onClick={previousQuestion}
              style={navButton}
            >
              Previous
            </button>

            <button
              onClick={nextQuestion}
              style={navButton}
            >
              Next
            </button>

          </div>

        </div>
      )}

      {/* RESULT */}

      {interviewFinished && (

        <div
          style={{
            background: "white",
            color: "black",
            width: "60%",
            margin: "50px auto",
            padding: "40px",
            borderRadius: "15px",
          }}
        >

          <h1>
            Interview Completed
          </h1>

          <h2>
            Your Score: {score}
          </h2>

          <h3>
            Performance Analysis
          </h3>

          {score >= 30 && (
            <p>Excellent Performance</p>
          )}

          {score >= 10 && score < 30 && (
            <p>Good Performance</p>
          )}

          {score < 10 && (
            <p>Need More Practice</p>
          )}

        </div>
      )}

    </div>
  );
}

const inputStyle = {
  width: "80%",
  padding: "15px",
  margin: "15px",
  borderRadius: "10px",
  border: "1px solid gray",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "15px 30px",
  margin: "15px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#071952",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
};

const navButton = {
  padding: "12px 25px",
  margin: "10px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#071952",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default App;