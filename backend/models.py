from sqlalchemy import Column, Integer, String
from database import Base


class Question(Base):
    __tablename__ = "questionstable"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    question = Column(String)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    role = Column(String)