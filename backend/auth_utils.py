import os

from dotenv import load_dotenv
from jose import jwt
from fastapi import Header, HTTPException

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"


def verify_token(token: str):
    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )

    return payload


def get_current_user(
        authorization: str | None = Header(default=None, alias="Authorization")
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header"
        )

    token = authorization.split(" ")[1]

    payload = verify_token(token)

    return payload
