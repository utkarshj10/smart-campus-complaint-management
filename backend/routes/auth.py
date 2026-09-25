from database import db
from models.user import UserCreate, UserLogin
import os
from dotenv import load_dotenv
from fastapi import APIRouter
import bcrypt
from jose import jwt


load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register_user(user: UserCreate):

    existing_user = db.users.find_one({"email": user.email})

    if existing_user:
        return {"message": "Email already registered"}

    password_hash = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    user_document = {
        "name": user.name,
        "email": user.email,
        "password_hash": password_hash,
        "role": "student",
        "student_id": user.student_id,
        "academic_department": user.academic_department
    }

    db.users.insert_one(user_document)

    return {
        "message": "Registration successful",
        "email": user.email
    }


@router.post("/login")
def login_user(user: UserLogin):

    existing_user = db.users.find_one({"email": user.email})

    if not existing_user:
        return {"message": "Invalid email or password"}

    password_valid = bcrypt.checkpw(
        user.password.encode("utf-8"),
        existing_user["password_hash"].encode("utf-8")
    )

    if not password_valid:
        return {"message": "Invalid email or password"}

    token_data = {
        "user_id": str(existing_user["_id"]),
        "role": existing_user["role"]
    }

    access_token = jwt.encode(
        token_data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer"
    }