from flask import Flask
from DB.milvus_connection import global_vector_DB
from Services.embedding import make_all_vectors, BERT_TOKENIZER, BERT_MODEL
from Services.vector_similarity import get_by_id,get_global_matches,curve_scores
from Routes.authRoutes import auth_bp
from Routes.vectorRoutes import vector_bp
from Routes.messageRoutes import message_bp
from Routes.eventRoutes import event_bp
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)

app.register_blueprint(auth_bp)
app.register_blueprint(vector_bp)
app.register_blueprint(message_bp)
app.register_blueprint(event_bp)
@app.route('/')
def home():
    vector = get_by_id(2)
    global_vector = [vector[0]["global_vector"]]
    mbti_vector = [vector[0]["mbti_vector"]]
    hobby_vector = [vector[0]["hobby_vector"]]
    interest_vector = [vector[0]["interest_vector"]]
    res = get_global_matches(global_vector_DB, 10, global_vector, mbti_vector, hobby_vector, interest_vector)
    scores = [score["distance"] for score in res["data"][0]]
    print(scores)
    return "Hello World"
    


if __name__ == '__main__':
    app.run(debug=True)
