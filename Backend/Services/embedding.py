from DB.milvus_connection import MilvusClient, global_vector_DB, category_vector_DB, predefined_vector_DB1
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def insert_vectors(client : MilvusClient,collection_name : str, userdata : dict):
    """
    Inserts vectors into a specified collection in Milvus.

    Args:
        client (MilvusClient): The Milvus client instance used to interact with the Milvus server.
        collection_name (str): The name of the collection where the vectors will be inserted.
        userdata (dict): A dictionary containing the data to be inserted. It must have the keys "id" and "vectors".
        example: {"id": 1, "vectors": [1,2,3,4,5,6,7,8,9,10]}

    Returns:
        res: The result of the insert operation from the Milvus client.
    """
    res = client.insert(
        collection_name=collection_name,
        data=userdata
    )
    return res

def mbti_accuracy_test():
    mbti_vectors = {
        "INFP": np.array([0.0761407, -0.97400398, 0.01463829, 0.2128487]),
        "ENFP": np.array([0.19765842, -0.71533357, -0.37724199, 0.55400137]),
        "INFJ": np.array([0.20948882, -0.7519913, -0.53085052, 0.32988065]),
        "ENFJ": np.array([-0.36591725, -0.84579404, 0.11037517, 0.37222886]),
        "INTJ": np.array([-0.1826023, -0.6339253, -0.68184129, 0.31604996]),
        "ENTJ": np.array([0.4027294, -0.84023865, 0.28782994, 0.2212735]),
        "INTP": np.array([0.31269756, -0.29898065, 0.09657657, 0.89638372]),
        "ENTP": np.array([0.06823657, -0.66888001, -0.74016175, 0.01019198]),
        "ISFP": np.array([-0.79099652, 0.26820562, 0.54516716, 0.0719932]),
        "ESFP": np.array([0.66935048, 0.48854891, 0.4523886, -0.32959741]),
        "ISTP": np.array([-0.24776738, 0.90460682, -0.27389474, 0.21278981]),
        "ESTP": np.array([0.07037793, 0.32881746, -0.10637984, -0.93574]),
        "ISFJ": np.array([0.14301969, 0.56489005, 0.48315316, -0.6534582]),
        "ESFJ": np.array([-0.51232697, 0.80661961, 0.18577273, -0.2288545]),
        "ISTJ": np.array([0.29734561, 0.72303985, 0.0883764, -0.61724272]),
        "ESTJ": np.array([-0.17031324, 0.90511924, 0.33844064, 0.19290024])
    }

    intj_vector = mbti_vectors['INFP'].reshape(1, -1)

    cosine_similarities = {
        mbti_type: cosine_similarity(intj_vector, vector.reshape(1, -1))[0][0]
        for mbti_type, vector in mbti_vectors.items()
        if mbti_type != 'INFP'
    }
    ranked_similarities = sorted(cosine_similarities.items(), key=lambda x: x[1], reverse=True)
    print(ranked_similarities)

def get_mbti_vector(mbti : str):
    """
    Converts a string representing an MBTI personality type into a vector.
    Args:
        mbti (str): A string representing an MBTI personality type.
    Returns:
        torch.Tensor: A tensor representing the MBTI personality type.
    """
    mbti_vectors = {
        "INFP": np.array([0.0761407, -0.97400398, 0.01463829, 0.2128487]),
        "ENFP": np.array([0.19765842, -0.71533357, -0.37724199, 0.55400137]),
        "INFJ": np.array([0.20948882, -0.7519913, -0.53085052, 0.32988065]),
        "ENFJ": np.array([-0.36591725, -0.84579404, 0.11037517, 0.37222886]),
        "INTJ": np.array([-0.1826023, -0.6339253, -0.68184129, 0.31604996]),
        "ENTJ": np.array([0.4027294, -0.84023865, 0.28782994, 0.2212735]),
        "INTP": np.array([0.31269756, -0.29898065, 0.09657657, 0.89638372]),
        "ENTP": np.array([0.06823657, -0.66888001, -0.74016175, 0.01019198]),
        "ISFP": np.array([-0.79099652, 0.26820562, 0.54516716, 0.0719932]),
        "ESFP": np.array([0.66935048, 0.48854891, 0.4523886, -0.32959741]),
        "ISTP": np.array([-0.24776738, 0.90460682, -0.27389474, 0.21278981]),
        "ESTP": np.array([0.07037793, 0.32881746, -0.10637984, -0.93574]),
        "ISFJ": np.array([0.14301969, 0.56489005, 0.48315316, -0.6534582]),
        "ESFJ": np.array([-0.51232697, 0.80661961, 0.18577273, -0.2288545]),
        "ISTJ": np.array([0.29734561, 0.72303985, 0.0883764, -0.61724272]),
        "ESTJ": np.array([-0.17031324, 0.90511924, 0.33844064, 0.19290024])
    }
    return mbti_vectors[mbti][0] ######################################### IF IT BREAKS IT'S HERE #########################################

def embed_MiniLM(mbti : str, id : int, category_dict : dict):
    final_vector_array = []
    mbti_vector = get_mbti_vector(mbti)
    global_user_data = {"id": id, "mbti_vector": format_vector_for_milvus(mbti_vector)}
    for category, words in category_dict.items():
        user_data = {"id": id}
        array_for_one_category = []
        for word in words:
            vector = model.encode(word)
            # Need to implement the checking with the predefined vectors
            array_for_one_category.append(vector)
        mean_vector = get_mean_vector_for_category(array_for_one_category)
        user_data[f"{category}_vector"] = format_vector_for_milvus(mean_vector)
        if category in ["interest","hobby","game"]:
            if category in ["interest","hobby"]:
                global_user_data[f"{category}_vector"] = format_vector_for_milvus(mean_vector)
            else:
                #insert_vectors(global_vector_DB,f"{category}_vectors", user_data)
                pass
        elif category in ["music","movie","book"]: 
            #insert_vectors(category_vector_DB,f"{category}_vectors", user_data)
            pass
        else:
            print("Category not found")
        if category not in ["interest","hobby"]:
            final_vector_array.append(mean_vector)
    final_vector = conactenate_final_vector(final_vector_array)
    global_user_data["global_vector"] = format_vector_for_milvus(final_vector)
    print(global_user_data)
    insert_vectors(global_vector_DB,"test_vectors", global_user_data)
    return "final_vector"

def get_mean_vector_for_category(array_of_vectors : np.ndarray):
    """
    Computes the mean vector for a given category from a numpy array of vectors.
    Args:
        array_of_vectors (np.ndarray): A numpy array of vectors.
    Returns:
        np.ndarray: A numpy array representing the mean vector of the input vectors.
    """
    mean_vector = np.mean(array_of_vectors, axis=0)
    return mean_vector

def format_vector_for_milvus(vector : np.ndarray):
    """
    Formats a numpy array for insertion into a Milvus collection.
    Args:
        vector (np.ndarray): The numpy array to be formatted.
    Returns:
        list: The formatted vector as a list.
    """
    return vector.tolist()
def conactenate_final_vector(final_vector : np.ndarray):
    """
    Concatenates a numpy array of vectors along the first dimension and reshapes the result.
    Args:
        final_vector (np.ndarray): A numpy array of vectors to be concatenated.
    Returns:
        np.ndarray: A single numpy array obtained by concatenating the input vectors along the first dimension and reshaping it to have a shape of (1, -1).
    """
    concatenated_vector = np.concatenate(final_vector, axis=0)
    return concatenated_vector.reshape(1, -1)[0]

model = SentenceTransformer('all-MiniLM-L12-v2')
