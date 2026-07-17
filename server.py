from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

from email_generator import generate_email

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    data = request.json

    result = generate_email(
        email_type=data["email_type"],
        tone=data["tone"],
        recipient=data["recipient"],
        purpose=data["purpose"],
        sender_name=data["sender_name"]
    )

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)