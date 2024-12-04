from flask import Blueprint, request, jsonify
from Services.embedding import embed_MiniLM

vector_bp = Blueprint('vector', __name__, url_prefix='/vector')

@vector_bp.route('/make', methods=['POST'])
def make_vector():
    return jsonify({"message": "Vector created"})

@vector_bp.route('/get', methods=['GET'])
def get_vector():
    return jsonify({"message": "Vector retrieved"})
