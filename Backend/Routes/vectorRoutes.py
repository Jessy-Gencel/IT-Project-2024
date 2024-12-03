from flask import Blueprint, request, jsonify
from Services.embedding import BERT_MODEL,BERT_TOKENIZER, make_all_vectors

vector_bp = Blueprint('vector', __name__, url_prefix='/vector')

@vector_bp.route('/make', methods=['POST'])
def make_vector():
    vectors = {
        "interest": ["sleeping", "eating"],
        "game": ["league of legends", "valorant"],
        "music": ["heavy metal", "Crowned"],
        "movie": ["Barbie", "Harry Potter"],
        "hobby": ["painting"],
        "book": ["Lord of the Rings"]
    }
    mbti = "INTJ"
    make_all_vectors(vectors, mbti, 1, BERT_TOKENIZER, BERT_MODEL)
    return jsonify({"message": "Vector created"})

@vector_bp.route('/get', methods=['GET'])
def get_vector():
    # Get vector logic here
    return jsonify({"message": "Vector retrieved"})
