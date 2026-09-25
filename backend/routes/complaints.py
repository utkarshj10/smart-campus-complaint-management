from fastapi import APIRouter, Depends
from database import db
from models.complaint import ComplaintCreate
from auth_utils import get_current_user


router = APIRouter(prefix="/complaints", tags=["Complaints"])


@router.post("/")
def create_complaint(
    complaint: ComplaintCreate,
    current_user=Depends(get_current_user)
):
    complaint_document = {
        "user_id": current_user["user_id"],
        "description": complaint.description,
        "venue": complaint.venue,
        "status": "Pending"
    }

    result = db.complaints.insert_one(complaint_document)

    return {
        "message": "Complaints added successfully",
        "complaint_id": str(result.inserted_id)
    }
