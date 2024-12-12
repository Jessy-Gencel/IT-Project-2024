from flask import Blueprint, request, jsonify
from Utils.password_hashing import hash_password, verify_password
from Utils.jwt_encode import jwt_full_encode, jwt_get_access_token, jwt_get_refresh_token, jwt_decode
from Utils.sanitize_input import sanitize_input, santize_array
from Services.couchbase_reads import find_user_by_email,find_user_by_id
from Services.couchbase_writes import store_user,store_profile
from Utils.extract_name import extract_name
from Services.embedding import embed_MiniLM
import jwt

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
    user = {"email" : email, "password" : password_hash, "first_name" : first_name, last_name : last_name, "user_id" : 4}
    store_user(user=user)
    
    return jsonify({"message": "User created successfully"}), 201

@auth_bp.route('/createProfile', methods=['POST'])
def create_profile():
    data = request.get_json()
    id = sanitize_input(data['id'])
    mbti = sanitize_input(data['mbti'])
    interests = santize_array(data['interests'])
    hobbies = santize_array(data['hobbies'])
    games = santize_array(data['games'])
    movies = santize_array(data['movies'])
    books = santize_array(data['books'])
    music = santize_array(data['music'])
    ############################## SANITIZATION ###############################
    traits = {"mbti" : mbti, "interest" : interests, "hobby" : hobbies, "game" : games, "movie" : movies, "book" : books, "music" : music}
    ############################## MAKE TRAITS DICT ###############################
    print(traits)
    return "We got here"
    predefined_matching_categories = embed_MiniLM(id,traits)
    ############################## MAKE VECTORS FOR PROFILE ###############################
    chats = []
    events = []
    trait_vectors = predefined_matching_categories
    user_profile = {"id" : id, "traits" : traits, "chats" : chats, "events" : events, "trait_vectors" : trait_vectors}
    ############################## MAKE PROFILE DICT ###############################
    profile = store_profile(user_profile)
    print(profile)
    return jsonify({"message": "User created successfully"}), 201

@auth_bp.route('/refresh', methods=['POST'])
def refresh():
    data = request.get_json()
    refresh_token = data.get('refresh_token')
    if not refresh_token:
        return jsonify({"message": "Refresh token required"}), 400
    try:
        decoded_token = jwt_decode(refresh_token)
        user_id = decoded_token['user_id']
        user = find_user_by_id(user_id)
        if not user:
            return jsonify({"message": "User not found"}), 404

        new_token = jwt_get_access_token(user)

        return jsonify({"token": new_token})

    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Refresh token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid refresh token"}), 401

@auth_bp.route('/users', methods=['GET'])
def get_users():
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



