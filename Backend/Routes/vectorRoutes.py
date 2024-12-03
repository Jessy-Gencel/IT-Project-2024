from flask import Blueprint, request, jsonify
from Services.embedding import BERT_MODEL,BERT_TOKENIZER, make_all_vectors

vector_bp = Blueprint('vector', __name__, url_prefix='/vector')

@vector_bp.route('/make', methods=['POST'])
def make_vector():
    vectors = {
        "interest": ["running", "parkouring"],
        "game": ["zumba", "tower defense"],
        "music": ["heavy metal", "nothing by fabvl"],
        "movie": ["Lord of the rings", "Harry Potter"],
        "hobby": ["ice skating, reading"],
        "book": ["Erebos"]
    }
    mbti = "INFP"
    make_all_vectors(vectors, mbti, 2, BERT_TOKENIZER, BERT_MODEL)
    return jsonify({"message": "Vector created"})

@vector_bp.route('/get', methods=['GET'])
def get_vector():
    # Get vector logic here
    return jsonify({"message": "Vector retrieved"})
