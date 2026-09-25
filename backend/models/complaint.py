from pydantic import BaseModel


class ComplaintCreate(BaseModel):
    description: str
    venue: str