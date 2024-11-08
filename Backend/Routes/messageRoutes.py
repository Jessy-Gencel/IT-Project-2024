from flask import Blueprint, request, jsonify

# Define the blueprint for messages
message_bp = Blueprint('messages', __name__, url_prefix='/messages')

@message_bp.route('/', methods=['GET'])
def get_messages():
    # Logic for retrieving messages
    return jsonify({"message": "Messages retrieved"})

@message_bp.route('/', methods=['POST'])
def post_message():
    # Logic for sending or posting a message
    return jsonify({"message": "Message posted"})
