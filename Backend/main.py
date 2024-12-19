from flask import Flask
from Routes.auth_routes import auth_bp
from Routes.vector_routes import vector_bp
from Routes.message_routes import message_bp
from Routes.event_routes import event_bp
from Routes.preset_routes import preset_bp
from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from Services.couchbase_reads import get_predefined_lists
from Services.embedding import embed_singular_vectors
from flask_socketio import SocketIO
from Services.websockets.listeners import init_websockets

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  
socketio = SocketIO(app, cors_allowed_origins="*")

app.register_blueprint(auth_bp)
app.register_blueprint(vector_bp)
app.register_blueprint(message_bp)
app.register_blueprint(event_bp)
app.register_blueprint(preset_bp)

init_websockets(socketio)
@app.route('/')
def home():
    return "yay"
    

if __name__ == '__main__':
    # socketio.run(app, host=os.getenv('IP_ADRESS_SERVER'), port=5000, debug=True)
    socketio.run(app, host="localhost", port=5000, debug=True)
