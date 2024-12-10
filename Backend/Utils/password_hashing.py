from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher()

def hash_password(password):
    """
    Hash a password using Argon2.
    """
    return ph.hash(password)

def verify_password(stored_hash, provided_password):
    """
    Verify the provided password against the stored hash.
    """
    try:
        ph.verify(stored_hash, provided_password)
        return True
    except VerifyMismatchError:
        return False
