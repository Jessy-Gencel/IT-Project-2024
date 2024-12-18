from Backend.DB.couchbase_connection import connect_to_couchbase
from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room, leave_room
from datetime import datetime
import uuid
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

print("Attempting to connect to Couchbase...")
db, cluster = connect_to_couchbase()
if db is None or cluster is None:
    raise Exception("Failed to connect to Couchbase")

print("Connected to Couchbase")
collection = db.default_collection()

@socketio.on('connect')
def handle_connect():
    print("Client connected")
    emit('server_response', {'message': 'Welcome'})

@socketio.on('send_message')
def handle_message(data):
    conversation_id = data['conversation_id']
    sender_id = data['sender_id']
    content = data['content']
    timestamp = datetime.utcnow().isoformat()

    message_id = str(uuid.uuid4())
    message_doc = {
        "message_id": message_id,
        "conversation_id": conversation_id,
        "sender_id": sender_id,
        "content": content,
        "timestamp": timestamp

    }

    collection.upsert(message_id, message_doc)
    print(f"Message {message_id} stored in Couchbase")

if __name__ == '__main__':
    print("Starting WebSocket server...")
    socketio.run(app, host=os.getenv("IP_ADRESS_SERVER"), port=5000)
    print("WebSocket server started")


