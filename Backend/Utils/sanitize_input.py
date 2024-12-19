import re
from flask import abort

def sanitize_input(input_str : str) -> str:
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
def santize_array(input_list : list) -> list:
    """
    Function to sanitize a list of strings.
    """
    return [sanitize_input(item) for item in input_list]