import os
import firebase_admin
from firebase_admin import credentials
from flask import Flask
from Routes.auth_routes import auth_bp
from Routes.vector_routes import vector_bp
from Routes.message_routes import message_bp
from Routes.event_routes import event_bp
from Routes.preset_routes import preset_bp
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from Services.couchbase_reads import get_predefined_lists
from Services.embedding import embed_singular_vectors
from flask_socketio import SocketIO
from Services.websockets.listeners import init_websockets


load_dotenv()
# INITIALIZE FLASK
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  

# SET SERVER CONTENT LIMITS
MEGABYTE = (2 ** 10) ** 2
app.config['MAX_CONTENT_LENGTH'] = None
app.config['MAX_FORM_MEMORY_SIZE'] = 50 * MEGABYTE

# SET ROUTE BLUEPRINTS
app.register_blueprint(auth_bp)
app.register_blueprint(vector_bp)
app.register_blueprint(message_bp)
app.register_blueprint(event_bp)
app.register_blueprint(preset_bp)

#INITIALIZE SOCKETIO
socketio = SocketIO(app, cors_allowed_origins="*")
init_websockets(socketio)
@app.route('/')
def home():
    return "yay"
    

if __name__ == '__main__':
    socketio.run(app, host=os.getenv('IP_ADDRESS_SERVER'), port=5000, debug=True)
