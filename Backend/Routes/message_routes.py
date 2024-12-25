from flask import Blueprint, request, jsonify
from Services.couchbase_reads import get_user_chats, get_room_messages

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


@message_bp.route('/chats/<int:chat_id>', methods=['GET'])
def get_chat(chat_id):
    # chat = find_chat_by_id(chat_id)
    # if chat:
    #     return jsonify(chat), 200
    # else:
    #     return jsonify({"error": "Chat not found"}), 404
    return "Yippie chats/conversation_id", 200

# fetch all chats of a user using their id
@message_bp.route('/user_chats/<int:user_id>', methods=['GET'])
def user_chats(user_id):
    result = get_user_chats(user_id)
    if result is None:
        return jsonify({"error": "User not found"}), 404
    return jsonify(result), 200

@message_bp.route('/<string:room_id>', methods=['GET'])
def get_messages_by_room_id(room_id):
    result = get_room_messages(room_id)
    print('messages: ', result)
    
    if not result:
        return jsonify({"error": "Messages not found"}), 404
    return result, 200

