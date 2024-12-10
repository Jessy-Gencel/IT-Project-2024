from flask import Flask
from DB.milvus_connection import global_vector_DB
from Services.embedding import model,embed_MiniLM
from Services.vector_similarity import get_by_id,get_global_matches,curve_scores,get_by_id
from Routes.authRoutes import auth_bp
from Routes.vectorRoutes import vector_bp
from Routes.messageRoutes import message_bp
from Routes.eventRoutes import event_bp
from Services.couchbase_functions import store_user
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
