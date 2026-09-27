import os
import json
from groq import Groq
from dotenv import load_dotenv


load_dotenv()


client = Groq(api_key=os.getenv("GROQ_API_KEY"))


CATEGORY_DEPARTMENT = {
    "IT / Network": "IT Department",
    "Electrical": "Maintenance",
    "Plumbing": "Maintenance",
    "Cleanliness": "Housekeeping",
    "Classroom Equipment": "Maintenance",
    "Infrastructure": "Maintenance",
    "Security": "Security Department",
    "Canteen": "Canteen Administration",
    "Other": "General Administration"
}


def analyze_complaint(description):
    prompt = f"""
Analyze this campus complaint.

Complaint:
{description}

Choose exactly one category:
IT / Network
Electrical
Plumbing
Cleanliness
Classroom Equipment
Infrastructure
Security
Canteen
Other

Choose exactly one priority:
High
Medium
Low

Return only JSON in this format:
{{
    "category": "...",
    "priority": "..."
}}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return json.loads(response.choices[0].message.content)

