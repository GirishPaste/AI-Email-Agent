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
    Generate EXACTLY THREE different professional email templates.

    Return ONLY valid JSON.

    {
      "templates": [
        "",
        "",
        ""
      ]
    }

    IMPORTANT FORMATTING RULES:

    Each email MUST follow this exact structure:

    Dear <recipient>,

    I hope you are doing well.

    <Main purpose paragraph>

    <Supporting details paragraph>

    Thank you for your time and consideration.

    Sincerely,
    <sender_name>

    VERY IMPORTANT:
    - Insert ONE blank line after the greeting.
    - Insert ONE blank line between every paragraph.
    - Put "Sincerely," on its own line.
    - Put the sender name on the next line.
    - Do NOT write everything in one paragraph.
    - Do NOT include the subject.
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