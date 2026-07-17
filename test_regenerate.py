from regenerate_email import regenerate_email

email = """
Dear Manager,

I want leave tomorrow because I am sick.

Thanks,
Shivam
"""

result = regenerate_email(
    email,
    "Make it more formal and professional."
)

print(result)
