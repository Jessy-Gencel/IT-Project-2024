from flask import Flask
from DB.milvus_connection import global_vector_DB
from Services.embedding import model,embed_MiniLM
from Services.vector_similarity import get_by_id,get_global_matches,curve_scores,get_by_id
from Routes.auth_routes import auth_bp
from Routes.vector_routes import vector_bp
from Routes.message_routes import message_bp
from Routes.event_routes import event_bp
import numpy as np
from flask import Flask
from flask_cors import CORS
from Services.couchbase_writes import store_user
import os
from dotenv import load_dotenv
from flask_socketio import SocketIO
from websockets import init_websockets

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")


collection = None  # Ensure this is properly initialized based on your DB logic
init_websockets(app, socketio, collection)

app.register_blueprint(auth_bp)
app.register_blueprint(vector_bp)
app.register_blueprint(message_bp)
app.register_blueprint(event_bp)
@app.route('/')
def home():
    return "yay"
    

if __name__ == '__main__':
    socketio.run(app, host=os.getenv('IP_ADRESS_SERVER'), port=5000, debug=True)

