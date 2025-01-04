from firebase_admin import storage
import firebase_admin
from firebase_admin import credentials
import os

def get_bucket():
    """
    Initialize and return the Firebase Storage bucket instance.
    """
    bucket_name = os.getenv('FIREBASE_BUCKET_NAME')  # Ensure this is set in your .env file
    bucket = storage.bucket(bucket_name)
    return bucket

cred = credentials.Certificate(os.getenv('FIREBASE_KEY'))
firebase_admin.initialize_app(cred)
bucket = get_bucket()
