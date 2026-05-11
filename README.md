 AI Smart Interview Platform

AI Smart Interview Platform is a full-stack interview preparation web application built using React, FastAPI, and PostgreSQL.

The platform allows users to:
- Enter personal interview details
- Select interview categories
- Attend technical and HR mock interviews
- Answer dynamic interview questions
- Track interview performance with scoring system



 Features

 User Management
- User onboarding form
- Name, email, and role collection
- PostgreSQL database storage

 Interview System
- Python interview questions
- SQL interview questions
- HR interview questions
- Dynamic question loading from PostgreSQL database

 Interview Experience
- One question at a time
- Previous/Next navigation
- Countdown timer
- Answer input system

 Performance Analysis
- Automatic score calculation
- Performance evaluation
- Interview completion report

 Full Stack Architecture
- React frontend
- FastAPI backend
- PostgreSQL database
- REST API integration



 Tech Stack

 Frontend
- React.js
- Vite
- JavaScript
- CSS

 Backend
- FastAPI
- Python
- SQLAlchemy

 Database
- PostgreSQL

 Version Control
- Git
- GitHub



 Project Structure

AI-Smart-Interview-platform/

backend/
- main.py
- models.py
- database.py

frontend/
- src/
- components/
- App.jsx



 API Endpoints

 Save User
POST /save-user

 Get Questions
GET /questions/{category}

Example:
GET /questions/python



 Database Tables

 users
Stores user interview details

 questionstable
Stores interview questions categorized by topic



 Future Enhancements

- AI-based answer evaluation
- Voice interview system
- Resume analyzer
- Admin dashboard
- Authentication system
- Company-specific interview sets
- Performance charts and analytics
- Webcam interview monitoring


 Author

Chandana Gowda
