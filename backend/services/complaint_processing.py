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

Choose exactly one priority using these rules:

High = immediate safety risk, serious security threat, fire, gas leak,
exposed live wiring, electric shock, major flooding, structural danger,
or another situation that could immediately cause injury or serious harm.

Medium = important issue that needs attention soon but does not present
an immediate danger. Examples include multiple lights/fans not working,
major equipment failure, significant plumbing problems, or major network
outage affecting classes/labs.

Low = minor issue with little or no immediate safety risk. Examples include
a single light/fan not working, minor cleanliness problems, small leaks,
broken furniture, or cosmetic damage.

Do not assign High merely because the issue is inconvenient or affects
a class. High priority must involve immediate danger, serious security
risk, or major disruption.

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