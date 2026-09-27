from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import db

from routes.auth import router as auth_router
from routes.complaints import router as complaints_router


app = FastAPI(title="Smart Campus Complaint Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(complaints_router)


@app.get("/")
def home():
    return {"message": "Smart Campus Complainet Management System API is working"}


@app.get("/db-test")
def database_test():
    db.command("ping")
    return {"message": "MongoDB connection successful"}