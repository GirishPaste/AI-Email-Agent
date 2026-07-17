import json

from api_client import generate_response
from prompts import SYSTEM_PROMPT, build_prompt

from validator import validate_input
from subject_generator import suggest_subject
from tips_generator import EMAIL_TIPS


def generate_email(email_type, tone, recipient, purpose, sender_name):

    # Validate input
    valid, message = validate_input(
        email_type,
        tone,
        recipient,
        purpose,
        sender_name
    )

    if not valid:
        return {"error": message}

    # Generate subject locally
    subject = suggest_subject(email_type)

    # Build AI prompt
    user_prompt = build_prompt(
        email_type=email_type,
        tone=tone,
        recipient=recipient,
        purpose=purpose,
        sender_name=sender_name
    )

    instruction = """
Generate ONLY THREE different professional email templates.

Return ONLY JSON.

{
    "templates": [
        "",
        "",
        ""
    ]
}

Rules:
- No markdown.
- No ```json.
- Each email must contain:
  Greeting
  Body
  Professional Closing
"""

    response = generate_response(
        SYSTEM_PROMPT,
        user_prompt + instruction
    )

    response = response.replace("```json", "").replace("```", "").strip()

    data = json.loads(response)

    return {
        "subject": subject,
        "templates": data["templates"],
        "tips": EMAIL_TIPS
    }