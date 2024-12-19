import os
from flask import request
from werkzeug.utils import secure_filename
import uuid

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    """
    Check if a file has an allowed extension.

    :param filename: Name of the uploaded file.
    :return: True if the file extension is allowed, False otherwise.
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_profile_picture(user_id):
    """
    Saves an uploaded profile picture to the server and returns the image URL.

    :param user_id: The unique ID of the user whose profile picture is being updated.
    :return: A dictionary with the status of the operation and the image URL (if successful).
    """
    if 'profile_picture' not in request.files:
        return {"status": "error", "message": "No file part in the request"}

    file = request.files['profile_picture']
    
    if file.filename == '':
        return {"status": "error", "message": "No file selected"}

    if file and allowed_file(file.filename):
        try:
            # Generate a secure filename and save it to the server
            filename = secure_filename(file.filename)
            unique_filename = f"{user_id}_{uuid.uuid4().hex}_{filename}"  # Use user_id for uniqueness
            filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
            file.save(filepath)

            # Generate the file's public URL (relative path for now)
            image_url = f"/{UPLOAD_FOLDER}/{unique_filename}"

            return {"status": "success", "image_url": image_url}

        except Exception as e:
            return {"status": "error", "message": f"Server error: {str(e)}"}
    else:
        return {"status": "error", "message": "File type not allowed"}


def create_profile(payload):
    """
    Creates a user profile and stores it in the database.
    Integrates profile picture uploading functionality.
    """
    data = request.get_json()
    id = payload['user_id']  # Unique user ID

    # Sanitize and process user traits
    mbti = sanitize_input(str(data['mbti']))
    interests = santize_array(data['interests'])
    hobbies = santize_array(data['hobbies'])
    games = santize_array(data['games'])
    movies = santize_array(data['movies'])
    books = santize_array(data['books'])
    music = santize_array(data['music'])
    
    traits = {
        "mbti": mbti,
        "interest": interests,
        "hobby": hobbies,
        "game": games,
        "movie": movies,
        "book": books,
        "music": music
    }

    # Create trait vectors for predefined matching categories
    predefined_matching_categories = embed_MiniLM(int(id), traits)
    print(predefined_matching_categories)

    # Initialize chats and events
    chats = []
    events = []

    # Find user details
    user = find_user_by_id(id)

    # Handle profile picture upload
    pfp_result = save_profile_picture(id)
    if pfp_result["status"] == "error":
        return pfp_result["message"], 400  # Return error if PFP upload fails
    
    profile_picture_url = pfp_result["image_url"]

    # Create user profile dictionary
    user_profile = {
        "id": id,
        "name": user["first_name"],
        "traits": traits,
        "chats": chats,
        "events": events,
        "trait_vectors": predefined_matching_categories,
        "profile_picture": profile_picture_url  # Add PFP URL to the profile
    }

    # Store profile in the database
    profile = store_profile(user_profile)

    return "User created correctly", 200
