from flask_socketio import SocketIO, emit

def init_websockets(app, socketio, collection):
    """
    Initializes WebSocket routes for the given Flask app and SocketIO instance.

    :param app: Flask application instance.
    :param socketio: SocketIO instance.
    :param collection: Couchbase collection instance for database operations.
    """

    @socketio.on('connect')
    def handle_connect():
        """Handles new WebSocket connections."""
        print(f"Client connected: {request.sid}")
        emit('server_response', {'message': 'Welcome to the WebSocket server!'})

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

            # Create a unique ID and timestamp for the message
            message_id = str(uuid.uuid4())
            timestamp = datetime.utcnow().isoformat()

            # Prepare the document for Couchbase
            message_doc = {
                "message_id": message_id,
                "conversation_id": conversation_id,
                "sender_id": sender_id,
                "recipient_id": recipient_id,
                "content": content,
                "timestamp": timestamp
            }

            # Store the message in Couchbase
            collection.upsert(message_id, message_doc)

            # Emit a response back to the client
            emit('response', {
                'status': 'success',
                'message_id': message_id,
                'timestamp': timestamp
            }, broadcast=True)
        except Exception as e:
            emit('response', {'status': 'error', 'message': str(e)})

