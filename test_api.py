from api_client import generate_response

reply = generate_response(
    "You are a helpful assistant.",
    "Say hello in one sentence."
)

print(reply)