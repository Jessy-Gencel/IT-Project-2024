import base64
from dotenv import load_dotenv
import os

load_dotenv()
secret_key = os.getenv("ENCRYPTION_KEY")

def decrypt(encrypted_password):
    decrypted_bytes = base64.b64decode(encrypted_password)
    return decrypted_bytes.decode('utf-8')
