from Backend.DB.couchbase_connection import connect_to_couchbase
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from couchbase.cluster import Cluster, ClusterOptions
from couchbase.auth import PasswordAuthenticator
from datetime import datetime
import uuid

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

db, cluster = connect_to_couchbase()
if db is None or cluster is None:
    raise Exception("Failed to connect to Couchbase")

collection = db.default_collection()

@socketio.on('connect')
def handle_connect():
    print("Client connected")
    emit('server_response', {'message': 'Welcome'})

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

    emit('response', {
        'message': 'Message received and stored.',
        'message_id': message_id,
        'timestamp': timestamp
    })


if __name__ == '__main__':
    socketio.run(app, host='10.2.88.71', port=5000)