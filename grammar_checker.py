from api_client import generate_response


def check_grammar(email):

    system_prompt = """
You are a professional English grammar expert.

Correct grammar, spelling, punctuation, and sentence structure.

Do not change the meaning.

Return only the corrected email.
"""

    return generate_response(system_prompt, email)