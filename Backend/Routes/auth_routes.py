from flask import Blueprint, request, jsonify
from Utils.password_hashing import hash_password, verify_password
from Utils.jwt_encode import jwt_full_encode, token_refresh
from Utils.sanitize_input import sanitize_input, santize_array
from Services.couchbase_reads import find_user_by_email,find_user_by_id
from Services.couchbase_writes import store_user,store_profile
from Utils.extract_name import extract_name
from Services.embedding import embed_MiniLM
from Utils.jwt_encode import token_required
from Utils.image_upload import save_profile_picture
import jwt
import json

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    email = sanitize_input(data['email'])
    password = sanitize_input(data['password'])
    user = find_user_by_email(email)
    print(user)
    
    if not user or not verify_password(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401
    
    access_token, refresh_token = jwt_full_encode(user)

    return jsonify({
        "id" : user["id"],
        "access_token": access_token,
        "refresh_token": refresh_token
    })

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = sanitize_input(data['email'])
    password = sanitize_input(data['password'])
    password_hash = hash_password(password)
    print(password_hash)
    print(type(password_hash))
    first_name,last_name = extract_name(email=email)
    user_dict = {"email" : email, "password" : password_hash, "first_name" : first_name, "last_name" : last_name}
    user = store_user(user=user_dict)
    access_token, refresh_token = jwt_full_encode(user)
    return jsonify({
        "id" : user["id"],
        "access_token": access_token,
        "refresh_token": refresh_token,
        "message": "User created correctly"
    })

@auth_bp.route('/createProfile', methods=['POST'])
def create_profile():
    
    data = json.loads(request.form['data'])
    pfp = request.files['pfp']
    print(data)
    print(pfp)
    age = sanitize_input(str(data['age']))
    mbti = sanitize_input(str(data['mbti']))
    interests = santize_array(data['interests'])
    hobbies = santize_array(data['hobbies'])
    games = santize_array(data['games'])
    movies = santize_array(data['movies'])
    books = santize_array(data['books'])
    music = santize_array(data['music'])


    ############################## SANITIZATION ###############################
    """profile_pick = data['pfp']
    pfp_result = save_profile_picture(profile_pick,id)
    if pfp_result["status"] == "error":
        return pfp_result["message"], 400  # Return error if PFP upload fails
    pfp = pfp_result["image_url"]
    ############################## HANDLE IMAGE UPLOAD ###############################
    traits = {"mbti" : mbti, "interest" : interests, "hobby" : hobbies, "game" : games, "movie" : movies, "book" : books, "music" : music}
    ############################## MAKE TRAITS DICT ###############################
    predefined_matching_categories = embed_MiniLM(int(id),traits)
    print(predefined_matching_categories)
    ############################## MAKE VECTORS FOR PROFILE ###############################
    chats = []
    events = []
    trait_vectors = predefined_matching_categories
    user = find_user_by_id(id)
    user_profile = {"id" : id,"age": age,"pfp" : pfp,"name": user["first_name"], "traits" : traits, "chats" : chats, "events" : events, "trait_vectors" : trait_vectors}
    ############################## MAKE PROFILE DICT ###############################
    profile = store_profile(user_profile)
    return "User created correctly", 200"""

@auth_bp.route('/refresh', methods=['POST'])
def refresh():
    data = request.get_json()
    token = token_refresh(data)
    return token

@auth_bp.route('/users', methods=['GET'])
@token_required
def get_users(payload):
    user_id = payload['user_id']
    print(user_id)
    # return jsonify(users)
    return "Yippie users", 200

@auth_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    # user = find_user_by_id(user_id)
    # if user:
    #     return jsonify(user), 200
    # else:
        return "Yippie user/user_id", 200

@auth_bp.route('/profiles', methods=['GET'])
def get_profiles():
    # return jsonify(profiles)
    return "Yippie profiles", 200

@auth_bp.route('/profiles/<profile_id>', methods=['GET'])
def get_profile(profile_id):
    # profile = find_profile_by_id(profile_id)
    # if profile:
    #     return jsonify(profile), 200
    # else:
    #     return jsonify({"error": "Profile not found"}), 404
    return "Yippie profiles/profile_id", 200



