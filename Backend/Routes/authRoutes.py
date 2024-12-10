from flask import Blueprint, request, jsonify
from Utils.passwordHashing import hash_password, verify_password
from Utils.jwtEncode import jwt_full_encode, jwt_get_access_token, jwt_get_refresh_token, jwt_decode
from DB.couchbase_connection import  store_user,find_user_by_id, find_user_by_email, find_profile_by_id, find_all_profiles, find_all_users
from Utils.sanitizeInput import sanitize_input
from Services.couchbase_functions import find_user_by_email,store_user,find_user_by_id
import jwt

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = sanitize_input(data['email'])
    password = sanitize_input(data['password'])
    user = find_user_by_email(email)
    
    if not user or not verify_password(user.password_hash, password):
        return jsonify({"message": "Invalid credentials"}), 401
    
    access_token, refresh_token = jwt_full_encode(user)

    return jsonify({
        "access_token": access_token,
        "refresh_token": refresh_token
    })

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = sanitize_input(data['email'])
    password = sanitize_input(data['password'])
    password_hash = hash_password(password)

    store_user(email, password_hash)
    
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
    users = find_all_users()
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
    profiles = find_all_profiles()
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



