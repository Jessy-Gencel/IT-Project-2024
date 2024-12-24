import os
from werkzeug.utils import secure_filename
import uuid
from dotenv import load_dotenv
from werkzeug.datastructures import FileStorage

load_dotenv()

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = f"{os.getenv('PFP_UPLOAD_FOLDER')}"


def allowed_file(filename : str) -> bool: 
    """
    Check if a file has an allowed extension.

    :param filename: Name of the uploaded file.
    :return: True if the file extension is allowed, False otherwise.
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_profile_picture(file : FileStorage, user_id : str) -> dict:
    """
    Saves an uploaded profile picture to the server and returns the image URL.

    :param file: The extracted file object from the request.
    :param user_id: The unique ID of the user whose profile picture is being updated.
    :return: A dictionary with the status of the operation and the image URL (if successful).
    """
    if not file:
        return {"status": "error", "message": "No file provided"}

    if file.filename == '':
        return {"status": "error", "message": "No file selected"}

    if allowed_file(file.filename):
        try:
            # Secure and generate a unique filename
            filename = secure_filename(file.filename)
            unique_filename = f"{user_id}_{uuid.uuid4().hex}_{filename}"  # Ensure uniqueness
            filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
            
            # Save the file to the designated folder
            file.save(filepath)

            # Generate a public URL (relative path for now)
            image_url = f"/{UPLOAD_FOLDER}/{unique_filename}"

            return {"status": "success", "image_url": image_url}

        except Exception as e:
            return {"status": "error", "message": f"Server error: {str(e)}"}
    else:
        return {"status": "error", "message": "File type not allowed"}
