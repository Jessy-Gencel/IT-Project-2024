from flask_socketio import SocketIO, emit
from Services.couchbase_writes import store_chats



def init_websockets(socketio):
    """
    Initializes WebSocket routes for the given Flask app and SocketIO instance.

    :param app: Flask application instance.
    :param socketio: SocketIO instance.
    :param collection: Couchbase collection instance for database operations.
    """

    @socketio.on('connect')
    def handle_connect():
        """Handles new WebSocket connections."""
        print(f"Client connected: yay")
        emit('server_response', {'message': 'Welcome to the WebSocket server!'})
        
    # @socketio.on('new_chat')
    # def handle_new_chat():
        

    @socketio.on('send_message')
    def handle_send_message(data):
        """
        Handles incoming messages.
        Expects:
            {
                "conversation_id": "conv123",
                "sender_id": "user1",
                "recipient_id": "user2",
                "content": "Hello, World!"
            }
        """
        try:
            # Extract message details
            conversation_id = data.get('conversation_id')
            sender_id = data.get('sender_id')
            recipient_id = data.get('recipient_id')
            content = data.get('content')
            print(conversation_id)
            print(sender_id)
            print(recipient_id)
            print(content)
            # Store message in the database
            message_dict = {
                "conversation_id": conversation_id,
                "sender_id": sender_id,
                "recipient_id": recipient_id,
                "messages": []
            }
            store_chats(message_dict)
            return "Message Sent"

        except Exception as e:
            emit('response', {'status': 'error', 'message': str(e)})
            
    @socketio.on('disconnect')
    def handle_disconnect():
        print("Client disconnected")
