from flask import Blueprint, request, jsonify
from Services.embedding import embed_MiniLM

vector_bp = Blueprint('vector', __name__, url_prefix='/vector')

@vector_bp.route('/make', methods=['POST'])
def make_vector():
    return jsonify({"message": "Vector created"})

@vector_bp.route('/get', methods=['GET'])
def get_vector():
    return jsonify({"message": "Vector retrieved"})


@vector_bp.route('/matches', methods=['GET'])
def get_matches():
    # matches = find_all_matches()
    # return jsonify(matches)
    return "Yippie matches", 200

@vector_bp.route('/matches/<int:matching_id>', methods=['GET'])
def get_match(matching_id):
    # match = find_match_by_id(matching_id)
    # if match:
    #     return jsonify(match), 200
    # else:
    #     return jsonify({"error": "Match not found"}), 404
    return "Yippie matches/matching_id", 200
