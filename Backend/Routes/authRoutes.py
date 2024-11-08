from flask import Blueprint, request, jsonify
import re
from flask import abort
from ..Utils.passwordHashing import hash_password, verify_password
from ..Utils.jwtEncode import jwt_full_encode, jwt_get_access_token, jwt_get_refresh_token, jwt_decode
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


def find_user_by_email(email):
    pass
def sanitize_input(input_str):
    """
    Basic sanitization function to detect potentially harmful SQL characters.
    """
    blacklist = [
        r"(--)",  # Comment sequence in SQL
        r"(\b(SELECT|INSERT|DELETE|UPDATE|DROP|ALTER|CREATE|TRUNCATE)\b)",  # SQL keywords
        r"(;)",   # Statement terminator
        r"(\')",  # Single quote
        r"(--)",  # SQL comment
        r"(\")",  # Double quote
        r"(\#)"   # Another comment symbol in some SQL variants
    ]

    # Compile regex with blacklist patterns
    blacklist_pattern = re.compile("|".join(blacklist), re.IGNORECASE)

    if blacklist_pattern.search(input_str):
        abort(400, description="Invalid characters in input.")
    
    return input_str

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = sanitize_input(data['email'])
    password = sanitize_input(data['password'])
    password_hash = hash_password(password)

    # Store user data with hashed password (Replace with actual DB logic)
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

