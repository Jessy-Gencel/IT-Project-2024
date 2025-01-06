from DB.milvus_connection import MilvusClient, global_vector_DB, category_vector_DB, predefined_vector_DB1
from Services.vector_similarity import check_with_predefined_vectors,make_category_bucket_array
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from Utils.translate_to_string import translate_predefined_vector_to_string
from Utils.expected_database_keywords import VECTOR_FIELDS,GLOBAL_VECTOR_FIELDS
from itertools import chain

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
def get_vector(client: MilvusClient, collection_name: str, ids : list[int]):
    """
    Retrieves a vector from a specified collection in Milvus.

    Args:
        client (MilvusClient): The Milvus client instance used to interact with the Milvus server.
        collection_name (str): The name of the collection from which the vector will be retrieved.
        id (int): The ID of the vector to be retrieved.

    Returns:
        res: The result of the get operation from the Milvus client.
    """
    res = client.get(
        collection_name=collection_name,
        ids=ids
    )
    return res
def delete_vectors(client : MilvusClient,collection_name : str,ids : list[int]):
    """
    Deletes vectors from a specified collection in Milvus.

    Args:
        client (MilvusClient): The Milvus client instance used to interact with the Milvus server.
        collection_name (str): The name of the collection from which the vectors will be deleted.
        ids (list[int]): A list of IDs corresponding to the vectors to be deleted.

    Returns:
        res: The result of the delete operation from the Milvus client.
    """
    res = client.delete(
        collection_name=collection_name,
        ids=ids
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
        list <float>: A list representing the MBTI personality type.
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
    return mbti_vectors[mbti] 

def embed_singular_vectors(category : str, words : list[str]):
    """
    Embeds a list of words into a vector and returns the mean vector of the embeddings.
    Args:
        category (str): The category of the words.
        words (list[str]): A list of words to be embedded.
    """
    for word in words:
        word = word.lower()
        vector = model.encode(word)
        if category == "game":
            insert_vectors(category_vector_DB, f"{category}_predefined_vectors", {f"{category}_predefined_vectors": vector.tolist(), "word": word})
        else:
            insert_vectors(predefined_vector_DB1, f"{category}_predefined_vectors", {f"{category}_predefined_vectors": vector.tolist(), "word": word})            
    return "All vectors added"

def embed_singular_vector(word : str):
    """
    Embeds a single word into a vector and returns the mean vector of the embeddings.
    Args:
        category (str): The category of the word.
        word (str): The word to be embedded.
    """
    word = word.lower()
    vector = model.encode(word)
    return vector

def embed_MiniLM(id : int, category_dict : dict):
    id_category_dict = {}
    category_vector_dict = get_category_vectors(id,category_dict, id_category_dict)
    global_vector_dict = update_global_vectors(id, category_vector_dict)
    write_standard_vectors(id, global_vector_dict)
    formatted_global_vector_dict = format_global_vector_dict(id,global_vector_dict)
    print(formatted_global_vector_dict)
    insert_vectors(global_vector_DB,"global_vectors", formatted_global_vector_dict)
    return id_category_dict


def update_vectors(id : int, category_dict : dict):
    print(category_dict)
    id_category_dict = {} #used for defining the buckets attached to a user
    global_user_data = {"id" : id} # used for storing all the data necessary to perform the global matching of users (global vector, mbti vector, hobby vector, interest vector)
    final_vector_array = [] # used for making the global vector based off of all other categories
    old_global_vector = get_vector(global_vector_DB, "global_vectors", id)[0]
    ################################## NEED TO DO SOME DATA MANIPULATION ON THIS ##################################
    #delete_existing_vectors(id, category_dict)
    provided_update_vectors = get_category_vectors(id, category_dict, id_category_dict, global_user_data, final_vector_array) # the values get passed in as reference types meaning they get altered within the function
    translate_predefined_vector_to_string(id_category_dict)
    raw_global_vector_info = update_global_vectors(id, provided_update_vectors, old_global_vector)
    global_vector_writable_dict = assemble_global_vector(id,raw_global_vector_info)
    #insert_vectors(global_vector_DB,"global_vectors", global_vector_writable_dict)
    return id_category_dict


    
def handle_mbti_vector(id : int, category_dict : dict):
    mbti = category_dict["mbti"]
    mbti_vector = get_mbti_vector(mbti)
    formatted_mbti_vector = format_vector_for_milvus(mbti_vector)
    insert_vectors(global_vector_DB, "mbti_vectors", {"id": id, "mbti_vectors": formatted_mbti_vector}) ##################################################################################
    del category_dict["mbti"]
    return formatted_mbti_vector

def get_word_vectors(category : str, words : list[str], category_ids : list[int], category_similarities : list[float], array_for_one_category : list[np.ndarray]):
    for word in words:
            vector = model.encode(word)
            similarity_word,category_id_word = check_with_predefined_vectors(category, vector)
            for i in range(len(category_id_word)):
                if category_id_word[i] not in category_ids:
                    category_ids.append(category_id_word[i])
                    category_similarities.append(similarity_word[i])
            array_for_one_category.append(vector)
            

def get_category_vectors(id : int,category_dict : dict, id_category_dict : dict):
    all_vectors_generated = {}
    if "mbti" in category_dict:
        formatted_mbti_vector = handle_mbti_vector(id, category_dict)
        all_vectors_generated["mbti"] = formatted_mbti_vector
    for category, words in category_dict.items():
        user_data = {"id": id}
        array_for_one_category = []
        category_ids = []
        category_similarities = []
        get_word_vectors(category, words, category_ids, category_similarities, array_for_one_category)
        sorted_category_ids = make_category_bucket_array(category_similarities, category_ids, category)
        id_category_dict[f"{category}_vectors"] = sorted_category_ids
        mean_vector = get_mean_vector_for_category(array_for_one_category)
        user_data[f"{category}_vectors"] = format_vector_for_milvus(mean_vector)
        all_vectors_generated[category] = format_vector_for_milvus(mean_vector)
        if category in ["interest","hobby","game"]:
            insert_vectors(global_vector_DB,f"{category}_vectors", user_data)####################################################################################
        elif category in ["music","movie","book"]: 
            insert_vectors(category_vector_DB,f"{category}_vectors", user_data)#######################################################################################
        else:
            print("Category not found")
    return all_vectors_generated


def format_global_vector_dict(id:int,global_vector_dict : dict):
    formatted_global_vector_dict = {}
    for key in global_vector_dict.keys():
        if key not in GLOBAL_VECTOR_FIELDS:
            formatted_global_vector_dict[f"{key}_vectors"] = global_vector_dict[key]

    formatted_global_vector_dict["id"] = id
    return formatted_global_vector_dict

def delete_existing_vectors(id : int, category_dict : dict):
    for category,_ in category_dict.items():
        if category in ["interest","hobby","game","mbti"]:
            delete_vectors(global_vector_DB,f"{category}_vectors", [id])
        elif category in ["music","movie","book"]:
            delete_vectors(category_vector_DB,f"{category}_vectors", [id])
        else:
            print("Invalid category")
    delete_vectors(global_vector_DB,"global_vectors", [id])


def assemble_global_vector(id : int, raw_global_vector_info : dict):
    uploadable_global_vector = {}
    raw_global_array = [raw_global_vector_info["game"],raw_global_vector_info["movie"],raw_global_vector_info["book"],raw_global_vector_info["music"]]
    global_array = [value for sublist in raw_global_array for value in sublist]
    uploadable_global_vector["id"] = id
    uploadable_global_vector["global_vectors"] = global_array
    for key,value in raw_global_vector_info.items():
        if key in ["interest","hobby","mbti"]:
            uploadable_global_vector[f"{key}_vectors"] = value
    return uploadable_global_vector
    

def slice_global_vector_for_category(global_vector : list[np.float32], category : str,global_vector_dict : dict):
    match category:
        case "game":
            global_vector_dict["game"] = global_vector[0:384]
        case "movie":
            global_vector_dict["movie"] = global_vector[384:768]
        case "book":
            global_vector_dict["book"] = global_vector[768:1152]
        case "music":
            global_vector_dict["music"] = global_vector[1152:1536]
        case _:
            print("Invalid category")


def fill_global_vector_dict(global_vector_dict : dict, current_global_vector : dict = {}):
    for key in VECTOR_FIELDS:
        if key not in global_vector_dict:
            if key in ["interest","hobby","mbti"]:
                global_vector_dict[key] = current_global_vector[f"{key}_vectors"]
            else:
                slice_global_vector_for_category(current_global_vector["global_vectors"], key, global_vector_dict)


def update_global_vectors(id : int, category_vector_dict : dict, current_global_vector : dict = {}):
    global_vector_dict = {}
    for key,value in category_vector_dict.items():
        global_vector_dict[key] = value
    if current_global_vector != {}:
        fill_global_vector_dict(global_vector_dict, current_global_vector)
    else:
        fill_with_standard_values(global_vector_dict)
    return global_vector_dict
    

def fill_with_standard_values(global_vector_dict : dict):
    global_vector = []
    global_vector_components = {}
    for key in VECTOR_FIELDS:
        if key not in global_vector_dict:
            if key == "mbti":
                global_vector_dict[key] = [0.0 for _ in range(4)]
            else:
                global_vector_dict[key] = [0.0 for _ in range(384)]
        if key in GLOBAL_VECTOR_FIELDS:
            global_vector_components[key] = global_vector_dict[key]
    raw_global_array = [global_vector_components["game"],global_vector_components["movie"],global_vector_components["book"],global_vector_components["music"]]
    global_vector = [value for sublist in raw_global_array for value in sublist]
    global_vector_dict["global"] = global_vector

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

def write_standard_vectors(id:int ,global_vector_dict : dict):
    """
    Writes standard vectors to a dictionary.
    Args:
        global_vector_dict (dict): The dictionary to write the standard vectors to.
    """
    for key,value in global_vector_dict.items():
        if value[0:2] == [0.0,0.0]:
            if key in ["interest","hobby","mbti","game"]:
                insert_vectors(global_vector_DB,f"{key}_vectors", {f"{key}_vectors": value, "id": id})
            else:
                insert_vectors(category_vector_DB,f"{key}_vectors", {f"{key}_vectors": value, "id": id})
            
           


def format_vector_for_milvus(vector : np.ndarray):
    """
    Formats a numpy array for insertion into a Milvus collection.
    Args:
        vector (np.ndarray): The numpy array to be formatted.
    Returns:
        list: The formatted vector as a list.
    """
    return vector.tolist()
def concatenate_final_vector(final_vector : np.ndarray):
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

