# Smart Campus Complaint Management System

A full-stack web application designed to simplify the process of reporting, categorizing, and managing campus complaints. Students can submit complaints through a dedicated dashboard, while administrators can review complaints, identify the responsible department, and update their status.

The system uses an AI-powered classification workflow to automatically determine the **category** and **priority** of each complaint, reducing manual classification and helping route issues efficiently.

## Project Summary

The Smart Campus Complaint Management System provides a centralized platform for handling common campus issues such as network problems, electrical faults, cleanliness, infrastructure, security, and other student concerns.

When a complaint is submitted, its description is processed using the Groq API. The AI determines the appropriate complaint category and priority, after which the backend maps the category to the responsible campus department. The complaint is then stored in MongoDB and made available to both the student and administrator through their respective dashboards.

## Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS

### Backend

- Python
- FastAPI
- Pydantic
- JWT Authentication
- bcrypt

### Database

- MongoDB
- MongoDB Atlas

### AI

- Groq API
- `openai/gpt-oss-20b`

## Features

### Student Portal

- Student registration and login
- Secure JWT-based authentication
- Submit campus complaints
- Automatic AI-based category detection
- Automatic priority detection
- View assigned category and priority
- Track complaint status
- View complaint history
- Modern responsive dashboard

### Admin Portal

- Secure administrator authentication
- View all submitted complaints
- View student details
- View complaint category and priority
- View responsible department
- Update complaint status
- Dashboard statistics
- Centralized complaint management

## Complaint Categories

The system supports the following categories:

| Category            | Department             |
| ------------------- | ---------------------- |
| IT / Network        | IT Department          |
| Electrical          | Maintenance            |
| Plumbing            | Maintenance            |
| Cleanliness         | Housekeeping           |
| Classroom Equipment | Maintenance            |
| Infrastructure      | Maintenance            |
| Security            | Security Department    |
| Canteen             | Canteen Administration |
| Other               | General Administration |

## Complaint Priority

Each complaint is automatically assigned one of three priority levels:

- **High**
- **Medium**
- **Low**

## Complaint Status

Administrators can manage complaints using three status levels:

- **Pending**
- **In Progress**
- **Resolved**

## Application Workflow

```text
Student
   │
   ▼
Login / Registration
   │
   ▼
Submit Complaint
   │
   ▼
Groq AI Classification
   │
   ├── Category
   └── Priority
   │
   ▼
Department Mapping
   │
   ▼
MongoDB
   │
   ▼
Admin Dashboard
   │
   ▼
Status Update
   │
   ▼
Student Dashboard
```

System Architecture
┌─────────────────────┐
│ Student / Admin │
└──────────┬──────────┘
│
▼
┌─────────────────────┐
│ Next.js Frontend │
└──────────┬──────────┘
│ REST API
▼
┌─────────────────────┐
│ FastAPI Backend │
├─────────────────────┤
│ Authentication │
│ Complaint Processing │
│ Department Mapping │
└──────┬─────────┬────┘
│ │
▼ ▼
┌──────────┐ ┌──────────────┐
│ MongoDB │ │ Groq API │
│ │ │ AI Classifier│
└──────────┘ └──────────────┘

Project Structure
smart-campus-complaint/
│
├── backend/
│ ├── models/
│ │ ├── user.py
│ │ └── complaint.py
│ │
│ ├── routes/
│ │ ├── auth.py
│ │ └── complaints.py
│ │
│ ├── services/
│ │ └── complaint_processing.py
│ │
│ ├── auth_utils.py
│ ├── database.py
│ ├── main.py
│ └── requirements.txt
│
├── frontend/
│ ├── app/
│ │ ├── admin/
│ │ ├── dashboard/
│ │ ├── register/
│ │ ├── globals.css
│ │ ├── layout.js
│ │ └── page.js
│ │
│ ├── components/
│ ├── lib/
│ └── package.json
│
├── .gitignore
└── README.md
Project Scope

This project is developed as an academic mini-project demonstrating how AI can be integrated into a practical campus management system to automate complaint classification and prioritization while providing separate workflows for students and administrators.
