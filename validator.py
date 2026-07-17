from email_types import EMAIL_TYPES
from tone import TONES


def validate_input(email_type, tone, recipient, purpose, sender_name):

    if email_type not in EMAIL_TYPES:
        return False, "Invalid email type."

    if tone not in TONES:
        return False, "Invalid tone."

    if recipient.strip() == "":
        return False, "Recipient cannot be empty."

    if purpose.strip() == "":
        return False, "Purpose cannot be empty."

    if sender_name.strip() == "":
        return False, "Sender name cannot be empty."

    return True, "Valid"