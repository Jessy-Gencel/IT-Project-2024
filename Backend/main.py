from flask import Flask
from DB.milvus_connection import global_vector_DB
from Services.embedding import model,embed_MiniLM
from Services.vector_similarity import get_by_id,get_global_matches,curve_scores,get_by_id
from Routes.auth_routes import auth_bp
from Routes.vector_routes import vector_bp
from Routes.message_routes import message_bp
from Routes.event_routes import event_bp
import numpy as np

app = Flask(__name__)

app.register_blueprint(auth_bp)
app.register_blueprint(vector_bp)
app.register_blueprint(message_bp)
app.register_blueprint(event_bp)
@app.route('/')
def home():
    return "yay"
    


if __name__ == '__main__':
    app.run(debug=True)
