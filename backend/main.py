from fastapi import FastAPI
from database import db

app = FastAPI(title="Smart Campus Complaint Management System")


@app.get("/")
def home():
    return {"message": "Smart Campus Complainet Management System API is working"}


@app.get("/db-test")
def database_test():
    db.command("ping")
    return {"message": "MongoDB connection successful"}
