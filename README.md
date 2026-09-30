# Smart Campus Complaint Management System

A full-stack web application designed to simplify the process of reporting, categorizing, and managing campus complaints.

Students can submit complaints through a dedicated dashboard, while administrators can review complaints, view automatically detected categories and priorities, identify the responsible department, and update complaint status.

The system uses **AI-powered complaint classification** through the Groq API to automatically determine the category and priority of each complaint.

---

## Features

### Student Portal

- Student registration and login
- JWT-based authentication
- Submit campus complaints
- Enter complaint description and venue
- AI-based complaint category detection
- AI-based priority detection
- View complaint history
- Track complaint status
- Responsive dashboard

### Admin Portal

- Secure administrator authentication
- View all submitted complaints
- View student details
- View complaint category and priority
- View responsible department
- Update complaint status
- View complaint statistics

### AI Classification

When a complaint is submitted, the system sends its description to the **Groq API**.

The AI automatically determines:

- **Category** — IT / Network, Electrical, Plumbing, Cleanliness, etc.
- **Priority** — High, Medium, or Low

The detected category is then mapped to the appropriate campus department.

---

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

---

## Application Workflow

```text
Student
   │
   ▼
Register / Login
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

---

## Complaint Categories

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

### Priority Levels

| Priority | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| High     | Immediate safety risk or serious issue requiring urgent attention     |
| Medium   | Important issue requiring attention soon but without immediate danger |
| Low      | Minor issue with little or no immediate safety risk                   |

### Complaint Status

- Pending
- In Progress
- Resolved

---

# Getting Started

Follow the steps below to run the project locally.

## Prerequisites

Make sure the following are installed:

- **Git**
- **Python 3.10+**
- **Node.js 18+**
- **npm**
- A **MongoDB Atlas** account or local MongoDB installation
- A **Groq API key**

You can verify the installations using:

```bash
git --version
python --version
node --version
npm --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/utkarshj10/smart-campus-complaint-management.git
cd smart-campus-complaint-management
```

---

## 2. Set Up MongoDB

The backend uses MongoDB with a database named:

```text
smart_campus
```

You can use either **MongoDB Atlas** or a local MongoDB installation.

### MongoDB Atlas

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Create a database user.
4. Allow your IP address in **Network Access**.
5. Copy your MongoDB connection string.

Your connection string will look similar to:

```text
mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
```

---

## 3. Set Up the Backend

Open a terminal in the project root:

```bash
cd backend
```

Create a Python virtual environment:

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

---

## 4. Configure Backend Environment Variables

Inside the `backend` folder, create a file named:

```text
.env
```

Add:

```env
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
SECRET_KEY=your_long_random_secret_key
GROQ_API_KEY=gsk_your_groq_api_key
```

**Do not commit your `.env` file to GitHub.**

---

## 5. Get a Groq API Key

The AI complaint classification feature requires a Groq API key.

Create an account and generate an API key from the **Groq Console**.

Then add it to:

```text
backend/.env
```

```env
GROQ_API_KEY=your_groq_api_key
```

The application currently uses:

```text
openai/gpt-oss-20b
```

for complaint classification.

---

## 6. Start the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

## 7. Set Up the Frontend

Open a **new terminal** while keeping the backend running.

From the project root:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

---

## 8. Start the Frontend

Run:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

Open the URL in your browser.

The frontend is configured to communicate with the backend at:

```text
http://127.0.0.1:8000
```

Therefore, both the frontend and backend should be running at the same time.

---

# Running the Project

You should have **two terminals** running.

### Terminal 1 — Backend

```bash
cd smart-campus-complaint-management/backend

.venv\Scripts\activate

uvicorn main:app --reload
```

### Terminal 2 — Frontend

```bash
cd smart-campus-complaint-management/frontend

npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# Trying the Application

### As a Student

1. Register a new student account.
2. Log in.
3. Submit a complaint.
4. Enter the complaint description and venue.
5. The complaint is processed by the AI classifier.
6. The system determines the category and priority.
7. The complaint is assigned to the relevant department.
8. View the complaint and its status from the student dashboard.

### As an Administrator

An administrator account needs to exist in the MongoDB `users` collection with:

```text
role: "admin"
```

After logging in as an administrator, you can:

- View all complaints
- View student information
- View category and priority
- View the responsible department
- Update complaint status

Available statuses:

```text
Pending
In Progress
Resolved
```

---

# Project Structure

```text
smart-campus-complaint-management/
│
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   └── complaints.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   └── complaint.py
│   │
│   ├── services/
│   │   └── complaint_processing.py
│   │
│   ├── auth_utils.py
│   ├── database.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   │   └── api.js
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

# Smart Campus Complaint Management System

A full-stack web application designed to simplify the process of reporting, categorizing, and managing campus complaints.

Students can submit complaints through a dedicated dashboard, while administrators can review complaints, view automatically detected categories and priorities, identify the responsible department, and update complaint status.

The system uses **AI-powered complaint classification** through the Groq API to automatically determine the category and priority of each complaint.

---

## Features

### Student Portal

- Student registration and login
- JWT-based authentication
- Submit campus complaints
- Enter complaint description and venue
- AI-based complaint category detection
- AI-based priority detection
- View complaint history
- Track complaint status
- Responsive dashboard

### Admin Portal

- Secure administrator authentication
- View all submitted complaints
- View student details
- View complaint category and priority
- View responsible department
- Update complaint status
- View complaint statistics

### AI Classification

When a complaint is submitted, the system sends its description to the **Groq API**.

The AI automatically determines:

- **Category** — IT / Network, Electrical, Plumbing, Cleanliness, etc.
- **Priority** — High, Medium, or Low

The detected category is then mapped to the appropriate campus department.

---

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

---

## Application Workflow

```text
Student
   │
   ▼
Register / Login
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

---

## Complaint Categories

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

### Priority Levels

| Priority | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| High     | Immediate safety risk or serious issue requiring urgent attention     |
| Medium   | Important issue requiring attention soon but without immediate danger |
| Low      | Minor issue with little or no immediate safety risk                   |

### Complaint Status

- Pending
- In Progress
- Resolved

---

# Getting Started

Follow the steps below to run the project locally.

## Prerequisites

Make sure the following are installed:

- **Git**
- **Python 3.10+**
- **Node.js 18+**
- **npm**
- A **MongoDB Atlas** account or local MongoDB installation
- A **Groq API key**

You can verify the installations using:

```bash
git --version
python --version
node --version
npm --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/utkarshj10/smart-campus-complaint-management.git
cd smart-campus-complaint-management
```

---

## 2. Set Up MongoDB

The backend uses MongoDB with a database named:

```text
smart_campus
```

You can use either **MongoDB Atlas** or a local MongoDB installation.

### MongoDB Atlas

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Create a database user.
4. Allow your IP address in **Network Access**.
5. Copy your MongoDB connection string.

Your connection string will look similar to:

```text
mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
```

---

## 3. Set Up the Backend

Open a terminal in the project root:

```bash
cd backend
```

Create a Python virtual environment:

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

---

## 4. Configure Backend Environment Variables

Inside the `backend` folder, create a file named:

```text
.env
```

Add:

```env
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
SECRET_KEY=your_long_random_secret_key
GROQ_API_KEY=gsk_your_groq_api_key
```

**Do not commit your `.env` file to GitHub.**

---

## 5. Get a Groq API Key

The AI complaint classification feature requires a Groq API key.

Create an account and generate an API key from the **Groq Console**.

Then add it to:

```text
backend/.env
```

```env
GROQ_API_KEY=your_groq_api_key
```

The application currently uses:

```text
openai/gpt-oss-20b
```

for complaint classification.

---

## 6. Start the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

## 7. Set Up the Frontend

Open a **new terminal** while keeping the backend running.

From the project root:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

---

## 8. Start the Frontend

Run:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

Open the URL in your browser.

The frontend is configured to communicate with the backend at:

```text
http://127.0.0.1:8000
```

Therefore, both the frontend and backend should be running at the same time.

---

# Running the Project

You should have **two terminals** running.

### Terminal 1 — Backend

```bash
cd smart-campus-complaint-management/backend

.venv\Scripts\activate

uvicorn main:app --reload
```

### Terminal 2 — Frontend

```bash
cd smart-campus-complaint-management/frontend

npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# Trying the Application

### As a Student

1. Register a new student account.
2. Log in.
3. Submit a complaint.
4. Enter the complaint description and venue.
5. The complaint is processed by the AI classifier.
6. The system determines the category and priority.
7. The complaint is assigned to the relevant department.
8. View the complaint and its status from the student dashboard.

### As an Administrator

An administrator account needs to exist in the MongoDB `users` collection with:

```text
role: "admin"
```

After logging in as an administrator, you can:

- View all complaints
- View student information
- View category and priority
- View the responsible department
- Update complaint status

Available statuses:

```text
Pending
In Progress
Resolved
```

---

# Project Structure

```text
smart-campus-complaint-management/
│
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   └── complaints.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   └── complaint.py
│   │
│   ├── services/
│   │   └── complaint_processing.py
│   │
│   ├── auth_utils.py
│   ├── database.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   │   └── api.js
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```
