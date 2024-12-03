from flask import Flask
from Services.embedding import make_all_vectors, BERT_TOKENIZER, BERT_MODEL
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
    #vectors = {
        #"interest": ["sleeping", "eating"],
        #"game": ["league of legends", "valorant"],
        #"music": ["heavy metal", "Crowned"],
        #"movie": ["Barbie", "Harry Potter"],
        #"hobby": ["painting"],
        #"book": ["Lord of the Rings"]
    #}
    #mbti = "INTJ"
    #make_all_vectors(vectors, mbti, 1, BERT_TOKENIZER, BERT_MODEL)
    #return "yay"
    pass


if __name__ == '__main__':
    app.run(debug=True)
