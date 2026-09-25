from fastapi import FastAPI, Depends
from database import db
from routes.auth import router as auth_router
from routes.complaints import router as complaints_router
from auth_utils import verify_token, get_current_user

app = FastAPI(title="Smart Campus Complaint Management System")

app.include_router(auth_router)
app.include_router(complaints_router)


@app.get("/")
def home():
    return {"message": "Smart Campus Complainet Management System API is working"}


@app.get("/db-test")
def database_test():
    db.command("ping")
    return {"message": "MongoDB connection successful"}


@app.get("/protected")
def protected_route(current_user=Depends(get_current_user)):
    return {
        "message": "You are authenticated",
        "user_id": current_user["user_id"],
        "role": current_user["role"]
    }
