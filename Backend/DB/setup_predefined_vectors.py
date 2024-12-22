from DB.milvus_connection import category_vector_DB,predefined_vector_DB1
from Services.embedding import embed_singular_vectors

def make_predefined_vectors(category : str,words : list):
    """
    Embeds a list of words into a vector and returns the mean vector of the embeddings.
    Args:
        category (str): The category of the words.
        words (list): A list of words to be embedded.
    """
    embed_singular_vectors(category, words)
    