from fastapi import FastAPI

app = FastAPI(title="Smart Campus Complaint Management System")


@app.get("/")
def home():
    return { "message": "Smart Campus Complainet Management System API is working" }