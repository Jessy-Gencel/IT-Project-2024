from flask import Blueprint, request, jsonify,send_from_directory
from Utils.password_hashing import hash_password, verify_password
from Utils.jwt_encode import jwt_full_encode, token_refresh
from Utils.sanitize_input import sanitize_input, santize_array
from Services.couchbase_reads import find_user_by_email,find_user_by_id
from Services.couchbase_writes import store_user,store_profile
from Utils.extract_name import extract_name
from Services.embedding import embed_MiniLM
from Utils.jwt_encode import token_required
from Utils.image_upload import save_profile_picture,firebase_url_getter
from Utils.split_path import split_path
from DB.firebase_bucket import bucket
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
    
    print(f'ID: {user["id"]}')

    return jsonify({
        "id" : str(user["id"]),
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
        "id" : str(user["id"]),
        "access_token": access_token,
        "refresh_token": refresh_token,
        "message": "User created correctly"
    })


@auth_bp.route('/pfp/<filename>', methods=['GET'])
@token_required
def pfp_send_to_frontend(payload,filename):
    try:
        return firebase_url_getter(filename), 200
    except Exception as e:
        return str(e), 400
    

@auth_bp.route('/users', methods=['GET'])
def get_users():
    users = {"users" : [find_user_by_id(1), find_user_by_id(2), find_user_by_id(3)]}
    return jsonify(users), 200


@auth_bp.route('/createProfile', methods=['POST'])
def create_profile():
    data_raw = request.form["data"]
    pfp = request.form["pfp"]
    data = json.loads(data_raw)
    print(pfp)
    print(data)
    id = sanitize_input(str(data['id']))
    #age = sanitize_input(str(data['age']))
    mbti = sanitize_input(str(data['mbti']))
    interests = santize_array(data['interests'])
    hobbies = santize_array(data['hobbies'])
    games = santize_array(data['games'])
    movies = santize_array(data['movies'])
    books = santize_array(data['books'])
    music = santize_array(data['music'])
    print(mbti,interests,hobbies,games,movies,books,music)
    ############################## SANITIZATION ###############################
    pfp_result = save_profile_picture(pfp,id)
    if pfp_result["status"] == "error":
        return pfp_result["message"], 400  # Return error if PFP upload fails
    pfp_url = pfp_result["image_url"]
    blob = bucket.blob(pfp_url)
    blob.upload_from_filename(f"DB/PFP/{pfp_url}")
    print(pfp_url)
    ############################## HANDLE IMAGE UPLOAD ###############################
    traits = {"mbti" : mbti, "interest" : interests, "hobby" : hobbies, "game" : games, "movie" : movies, "book" : books, "music" : music}
    ############################## MAKE TRAITS DICT ###############################
    predefined_matching_categories = embed_MiniLM(int(id),traits)
    print(predefined_matching_categories)
    ############################## MAKE VECTORS FOR PROFILE ###############################
    trait_vectors = predefined_matching_categories
    user = find_user_by_id(id)
    user_profile = {"id" : id,"pfp" : pfp_url,"name": user["first_name"], "traits" : traits, "trait_vectors" : trait_vectors}
    ############################## MAKE PROFILE DICT ###############################
    profile = store_profile(user_profile)
    print(profile)
    return "User created correctly", 200

@auth_bp.route('/refresh', methods=['POST'])
def refresh():
    data = request.get_json()
    token = token_refresh(data)
    return token



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


