from api_client import generate_response


def regenerate_email(email, instruction):

    system_prompt = """
You are a professional corporate email assistant.

Improve the given email according to the user's instruction.

Keep it professional and workplace appropriate.
"""

    user_prompt = f"""
Email:

{email}

Instruction:

{instruction}

Return only the improved email.
"""

    return generate_response(system_prompt, user_prompt)