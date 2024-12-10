from flask import Blueprint, request, jsonify

# Define the blueprint for messages
message_bp = Blueprint('messages', __name__, url_prefix='/messages')

@message_bp.route('/messages/<int:message_id>', methods=['GET'])
def get_message(message_id):
    # message = find_messages_by_id(message_id)
    # if message:
    #     return jsonify(message), 200
    # else:
    #     return jsonify({"error": "Message not found"}), 404
    return "Yippie messages/message_id", 200

@message_bp.route('/', methods=['POST'])
def post_message():
    # Logic for sending or posting a message
    return jsonify({"message": "Message posted"})

@message_bp.route('/chats', methods=['GET'])
def get_chats():
    # chats = find_all_chats()
    # return jsonify(chats)
    return "Yippie chats", 200


@message_bp.route('/chats/<int:conversation_id>', methods=['GET'])
def get_chat(conversation_id):
    # chat = find_chat_by_id(conversation_id)
    # if chat:
    #     return jsonify(chat), 200
    # else:
    #     return jsonify({"error": "Chat not found"}), 404
    return "Yippie chats/conversation_id", 200

