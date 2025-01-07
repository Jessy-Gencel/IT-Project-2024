from flask import Blueprint, request, jsonify
from Services.embedding import embed_singular_vector
from Services.vector_similarity import get_global_matches,get_by_id,get_category_matches,check_with_predefined_vectors,match_with_one_specific_user
from Services.couchbase_reads import find_profile_by_id,get_users_with_matching_categories,order_users_by_matches,word_matches_with_specific_user
from Utils.sanitize_input import sanitize_input
from Utils.jwt_encode import token_required
from Utils.expected_database_keywords import VECTOR_FIELDS

vector_bp = Blueprint('vector', __name__, url_prefix='/vector')

@vector_bp.route('/make', methods=['POST'])
def make_vector():
    return jsonify({"message": "Vector created"})

@vector_bp.route('/getHomeMatches', methods=['GET'])
@token_required
def get_matching_vector(payload):
    id = payload['user_id']
    print("this is the user id" + str(id))
    user_vector = get_by_id(id)[0]
    res = get_global_matches(int(id),5, [user_vector["global_vectors"]], [user_vector["mbti_vectors"]], [user_vector["hobby_vectors"]], [user_vector["interest_vectors"]])
    matching_users = []
    for user in res:
        user_profile = find_profile_by_id(user["id"])
        score = round(float(user["distance"]),2) * 100
        score = int(score)
        user_profile["match_score"] = score
        matching_users.append(user_profile)
    return matching_users, 200

@vector_bp.route('/getMatchesByCategory', methods=['POST'])
@token_required
def get_matching_vector_by_category(payload):
    data = request.get_json()
    id = sanitize_input(str(data['id']))
    category = data["category"]
    if category == "game" or category == "interest" or category == "hobby" or category == "mbti":
        user_matches = get_category_matches(id=id,collection_name=f"{category}_vectors")[0]
    else:
        user_matches = get_category_matches(id=id,db_name="category_vector_DB",collection_name=f"{category}_vectors")[0]
    matching_users = []
    for user in user_matches:
        user_profile = find_profile_by_id(user["id"])
        score = round(int(user["distance"]),2) * 100
        user_profile["match_score"] = score
        matching_users.append(user_profile)
    return matching_users, 200

@vector_bp.route('/getMatchesBySingularWord', methods=['POST'])
@token_required
def get_matches_by_individual_word(payload):
    data = request.get_json()
    word = sanitize_input(str(data['id']))
    word_vector = embed_singular_vector(word)
    category = data["category"]
    res = check_with_predefined_vectors(category,word_vector,make_bucket=False)
    matching_ids = [specific_interest_vector['id'] for specific_interest_vector in res]
    all_users_with_matches_to_word = get_users_with_matching_categories(category,matching_ids)
    ordered_users = order_users_by_matches(category,matching_ids,all_users_with_matches_to_word)
    ######################################### WORK IN PROGRESS WILL NOT YET WORK, HAVE TO CHECK THE DATA STRUCTURES #####################################################
    return ordered_users, 200

@vector_bp.route('/getMatchesWithSpecificUser', methods=['POST'])
def get_matches_with_specific_user():
    matching_data = {}
    data = request.get_json()
    current_user_id = data["current_user_id"]
    other_user_id = data["other_user_id"]
    matching_percentages = match_with_one_specific_user(current_user_id,other_user_id)
    matching_data["matching_percentages"] = matching_percentages
    matching_words = word_matches_with_specific_user(current_user_id,other_user_id)
    return jsonify(matching_percentages,matching_words), 200