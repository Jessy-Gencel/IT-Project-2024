import os
from werkzeug.utils import secure_filename
import uuid
from dotenv import load_dotenv
from werkzeug.datastructures import FileStorage
import base64
from DB.firebase_bucket import bucket


load_dotenv()

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = f"{os.getenv('PFP_UPLOAD_FOLDER')}"


def firebase_url_getter(filename: str) -> str:
    """
    Get the URL of a file stored in Firebase Storage.

    :param filename: Name of the file in Firebase Storage.
    :return: The URL of the file.
    """
    return {"file": f"https://firebasestorage.googleapis.com/v0/b/{os.getenv('FIREBASE_BUCKET_NAME')}/o/{filename}?alt=media"}
def allowed_file(filename : str) -> bool: 
    """
    Check if a file has an allowed extension.

    :param filename: Name of the uploaded file.
    :return: True if the file extension is allowed, False otherwise.
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_profile_picture(file: str, user_id: str,existing_pfp = None) -> dict:
    """
    Saves a base64-encoded profile picture to the server and returns the image URL.

    :param file: The base64 string containing the image data.
    :param user_id: The unique ID of the user whose profile picture is being updated.
    :return: A dictionary with the status of the operation and the image URL (if successful).
    """
    if not file:
        return {"status": "error", "message": "No file provided"}

    try:
        # Split the base64 string into the header and encoded data
        header, encoded_image = file.split(",", 1)
        # Decode the base64 string into binary data
        image_data = base64.b64decode(encoded_image)
        # Extract MIME type from the header (e.g., image/png)
        if existing_pfp:
            filepath = os.path.join(UPLOAD_FOLDER, existing_pfp)
            filename = existing_pfp
        else:
            mime_type = header.split(":")[1].split(";")[0]
            extension = mime_type.split("/")[1]  # e.g., png, jpg
            # Generate a unique filename using user ID and UUID
            filename = f"{user_id}_{uuid.uuid4().hex}.{extension}"
            filepath = os.path.join(UPLOAD_FOLDER, filename)

        # Save the image data to the server
        with open(filepath, 'wb') as f:
            f.write(image_data)

        # Generate the URL for the image
        image_url = f"{filename}"

        blob = bucket.blob(image_url)
        blob.upload_from_filename(f"DB/PFP/{image_url}")

        os.remove(f"DB/PFP/{image_url}")

        return {"status": "success", "image_url": image_url}

    except Exception as e:
        return {"status": "error", "message": f"Server error: {str(e)}"}

