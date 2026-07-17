from email_generator import generate_email

result = generate_email(
    email_type="Meeting Request",
    tone="Professional",
    recipient="Project Manager",
    purpose="I would like to schedule a meeting to discuss the current project progress.",
    sender_name="Shivam Paste"
)

print(result)