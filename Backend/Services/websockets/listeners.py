from flask_socketio import SocketIO, emit, join_room, leave_room
from Services.couchbase_writes import store_chats
from flask import request



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

    @socketio.on('join_room')
    def on_join(data):
        sender_id = data.get('user1_id')
        recipient_id = data.get('user2_id')
        room = f'room:{min(sender_id, recipient_id)}:{max(sender_id, recipient_id)}'
        
        join_room(room)
        print(f'User {request.sid} joined room {room}')
        emit('server_response', {'message': f'You joined room {room}'}, room=room)

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
            sender_id = data.get('sender_id')
            recipient_id = data.get('recipient_id')
            message = data.get('message')
            room = f'room:{min(sender_id, recipient_id)}:{max(sender_id, recipient_id)}'
            print(f'message recieved from {sender_id} to {recipient_id} message: {message}')
            emit('new_message', {'sender_id': sender_id, 'message': message}, room=room)
            print(room)
            
            # Store message in the database
            # message_dict = {
            #     "conversation_id": conversation_id,
            #     "sender_id": sender_id,
            #     "recipient_id": recipient_id,
            #     "messages": []
            # }
            # store_chats(message_dict)
            # return "Message Sent"



        except Exception as e:
            emit('response', {'status': 'error', 'message': str(e)})
            
    @socketio.on('disconnect')
    def handle_disconnect():
        print("Client disconnected")
