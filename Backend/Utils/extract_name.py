def extract_name(email: str):
    """
    Extracts the name from an email address by splitting the address at the '@' symbol.

    Args:
        email: The email address from which to extract the name.

    Returns:
        str: The name extracted from the email address.
    """
    array_of_name =  email.split('.')
    return array_of_name[0],array_of_name[1].split('@')[0]