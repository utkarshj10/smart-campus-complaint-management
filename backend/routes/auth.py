from fastapi import APIRouter
import bcrypt


from models.user import UserCreate
from database import db

router = APIRouter(prefix="/auth", tags=["Authentication"])



@router.post("/register")
def register_user(user: UserCreate):

    existing_usr = db.users.find_one({"email": user.email})

    if existing_usr:
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