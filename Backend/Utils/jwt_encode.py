import jwt
import datetime
import os
from dotenv import load_dotenv
from flask import request,jsonify
from jwt import ExpiredSignatureError, InvalidTokenError
from Models.user import User
from functools import wraps
from Services.couchbase_reads import find_user_by_id


load_dotenv()

SECRET_KEY = os.getenv('JWT_SECRET')

def jwt_get_access_token(user: User) -> str:
    """
    Generate a JWT access token for a given user.

    This function creates a JSON Web Token (JWT) that includes the user's ID and an expiration time set to one hour from the current time. The token is encoded using the HS256 algorithm and a secret key.

    Args:
        user (User): The user object for which the access token is being generated. The user object must have an 'id' attribute.

    Returns:
        str: The encoded JWT access token as a string.
    """
    access_token = jwt.encode({
        'user_id': user["id"],
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)  # Example: 1 week
    }, SECRET_KEY, algorithm="HS256")
    return access_token

def jwt_get_refresh_token(user: User) -> str:
    """
    Generates a JWT refresh token for the given user.

    This function creates a JSON Web Token (JWT) that includes the user's ID and an expiration time set to one week from the current time. The token is encoded using the HS256 algorithm and a secret key.

    Args:
        user (User): The user object for which the refresh token is being generated. The user object must have an 'id' attribute.

    Returns:
        str: The encoded JWT refresh token as a string.
    """
    refresh_token = jwt.encode({
        'user_id': user["id"],
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7)  # Example: 1 week
    }, SECRET_KEY, algorithm="HS256")
    return refresh_token

def jwt_full_encode(user: User) -> tuple[str, str]: 
    """
    Encodes the given user information into JWT access and refresh tokens.

    Args:
        user (User): The user object containing user information.

    Returns:
        tuple[str, str]: A tuple containing the access token and refresh token as strings.
    """
    access_token = jwt_get_access_token(user)
    refresh_token = jwt_get_refresh_token(user)
    return access_token, refresh_token

def jwt_decode(token: str) -> dict:
    """
    Decodes a JWT token.

    Args:
        token (str): The JWT token to decode.

    Returns:
        dict: The decoded token as a dictionary.
    """
    return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

def extract_token():
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith("Bearer "):
        return auth_header.split(" ")[1]  # Extract the token part
    return None

def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload 
    except ExpiredSignatureError:
        return {"error": "Token has expired"}, 401
    except InvalidTokenError:
        return {"error": "Invalid token"}, 403

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = extract_token()
        if not token:
            return jsonify({"error": "Token is missing"}), 401

        result = verify_token(token)
        if isinstance(result, dict) and "error" in result:
            return jsonify(result), result[1]
        return f(payload=result, *args, **kwargs)

    return decorated

def token_refresh(data):
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