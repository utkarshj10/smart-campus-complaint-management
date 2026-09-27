from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from database import db
from models.complaint import ComplaintCreate
from auth_utils import get_current_user
from services.complaint_processing import (
    analyze_complaint,
    CATEGORY_DEPARTMENT
)

ALLOWED_STATUSES = {
    "Pending",
    "In Progress",
    "Resolved"
}

router = APIRouter(prefix="/complaints", tags=["Complaints"])


@router.post("/")
def create_complaint(
    complaint: ComplaintCreate,
    current_user=Depends(get_current_user)
):

    analysis = analyze_complaint(complaint.description)

    category = analysis["category"]
    priority = analysis["priority"]

    department = CATEGORY_DEPARTMENT[category]

    complaint_document = {
        "user_id": current_user["user_id"],
        "description": complaint.description,
        "venue": complaint.venue,
        "category": category,
        "priority": priority,
        "department": department,
        "status": "Pending"
    }

    result = db.complaints.insert_one(complaint_document)

    return {
        "message": "Complaints added successfully",
        "complaint_id": str(result.inserted_id)
    }


@router.get("/")
def get_my_complaints(
    current_user=Depends(get_current_user)
):
    complaints = db.complaints.find({"user_id": current_user["user_id"]})

    return {
        "complaints": [
            {
                "complaint_id": str(complaint["_id"]),
                "description": complaint["description"],
                "venue": complaint["venue"],
                "category": complaint["category"],
                "priority": complaint["priority"],
                "status": complaint["status"]
            }
            for complaint in complaints
        ]
    }


@router.get("/admin")
def get_all_complaints(
    current_user=Depends(get_current_user)
):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    complaints = db.complaints.find()

    complaint_list = []

    for complaint in complaints:
        student = db.users.find_one(
            {"_id": ObjectId(complaint["user_id"])}
        )

        complaint_list.append({
            "complaint_id": str(complaint["_id"]),
            "user_id": complaint["user_id"],
            "student_name": student["name"] if student else "Unknown",
            "student_id": student["student_id"] if student else "Unknown",
            "student_email": student["email"] if student else "Unknown",
            "description": complaint["description"],
            "venue": complaint["venue"],
            "category": complaint["category"],
            "priority": complaint["priority"],
            "department": complaint["department"],
            "status": complaint["status"]
        })

    return {
        "complaints": complaint_list
    }


@router.put("/admin/{complaint_id}/status")
def update_complaint_status(
    complaint_id: str,
    status: str,
    current_user=Depends(get_current_user)
):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    if status not in ALLOWED_STATUSES:
        raise HTTPException(
            status_code=400,
            detail="Invalid status"
        )

    result = db.complaints.update_one(
        {"_id": ObjectId(complaint_id)},
        {"$set": {"status": status}}
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return {
        "message": "Complaint status updated successfully"
    }
