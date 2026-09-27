import os

from dotenv import load_dotenv
from jose import jwt
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
security = HTTPBearer()


def verify_token(token: str):
    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )

    return payload


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    payload = verify_token(token)

    return payload
