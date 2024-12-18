from flask import Blueprint, request, jsonify
from Services.embedding import embed_MiniLM
from Services.vector_similarity import get_global_matches,get_by_id
from Services.couchbase_reads import find_profile_by_id

vector_bp = Blueprint('vector', __name__, url_prefix='/vector')

@vector_bp.route('/make', methods=['POST'])
def make_vector():
    return jsonify({"message": "Vector created"})

@vector_bp.route('/getHomeMatches/<int:userid>', methods=['GET'])
def get_matching_vector(userid):
    user_vector = get_by_id(userid)[0]
    res = get_global_matches(userid,5, [user_vector["global_vectors"]], [user_vector["mbti_vectors"]], [user_vector["hobby_vectors"]], [user_vector["interest_vectors"]])
    matching_users = []
    for user in res:
        user_profile = find_profile_by_id(user["id"])
        score = round(float(user["distance"]),2) * 100
        user_profile["match_score"] = score
        matching_users.append(user_profile)
    return matching_users, 200


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
