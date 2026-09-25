from fastapi import FastAPI, Header, HTTPException
from database import db
from routes.auth import router as auth_router
from auth_utils import verify_token

app = FastAPI(title="Smart Campus Complaint Management System")


app.include_router(auth_router)


@app.get("/")
def home():
    return {"message": "Smart Campus Complainet Management System API is working"}


@app.get("/db-test")
def database_test():
    db.command("ping")
    return {"message": "MongoDB connection successful"}


@app.get("/protected")
def protected_route(
    authorization: str | None = Header(default=None, alias="Authorization")
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header"
        )

    token = authorization.split(" ")[1]

    payload = verify_token(token)

    return {
        "message": "You are authenticated",
        "user_id": payload["user_id"],
        "role": payload["role"]
    }
