def split_path(file_path):
    """
    Splits a file path into directory and filename.

    Args:
        file_path (str): The file path in the format 'DB/PFP/image name'.

    Returns:
        tuple: A tuple containing the directory path and the filename.
    """
    import os

    directory, filename = os.path.split(file_path)
    return directory, filename