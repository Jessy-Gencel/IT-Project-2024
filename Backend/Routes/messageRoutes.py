from flask import Blueprint, request, jsonify
from DB.couchbase_connection import find_messages_by_id, find_chat_by_id, find_all_chats

# Define the blueprint for messages
message_bp = Blueprint('messages', __name__, url_prefix='/messages')

@message_bp.route('/messages/<int:message_id>', methods=['GET'])
def get_message(message_id):
    message = find_messages_by_id(message_id)
    if message:
        return jsonify(message), 200
    else:
        return jsonify({"error": "Message not found"}), 404

@message_bp.route('/', methods=['POST'])
def post_message():
    # Logic for sending or posting a message
    return jsonify({"message": "Message posted"})

@auth_bp.route('/chats', methods=['GET'])
def get_chats():
    chats = find_all_chats()
    return jsonify(chats)

@auth_bp.route('/chats/<int:conversation_id>', methods=['GET'])
def get_chat(conversation_id):
    chat = find_chat_by_id(conversation_id)
    if chat:
        return jsonify(chat), 200
    else:
        return jsonify({"error": "Chat not found"}), 404

