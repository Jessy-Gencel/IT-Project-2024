from transformers import BertTokenizer, BertModel, PreTrainedModel
from transformers.modeling_outputs import BaseModelOutputWithPoolingAndCrossAttentions
from DB.milvus_connection import MilvusClient, global_vector_DB, category_vector_DB, predefined_vector_DB1
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import torch

# Load pre-trained BERT model and tokenizer
def load_bert():
    """
    Loads the BERT tokenizer and model from the pretrained "bert-base-uncased" configuration.
    Returns:
        tuple: A tuple containing the BERT tokenizer and model.
            - tokenizer (BertTokenizer): The tokenizer for the BERT model.
            - model (BertModel): The BERT model.
    """

    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    model = BertModel.from_pretrained("bert-base-uncased")
    return tokenizer, model

def get_word_vector(tokenizer,model:PreTrainedModel,word):
    """
    Generates a word vector (embedding) for a given word using a tokenizer and a pre-trained model.
    Args:
        tokenizer: The tokenizer to convert the word into tokens.
        model (PreTrainedModel): The pre-trained model to generate the word embedding.
        word (str): The word for which the embedding is to be generated.
    Returns:
        torch.Tensor: The word embedding as a tensor, averaged over the last hidden state.
    """
    inputs = tokenizer(word, return_tensors="pt")
    with torch.no_grad():
        outputs : BaseModelOutputWithPoolingAndCrossAttentions = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1)


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

def make_all_vectors(category_dict : dict, mbti : list,id : int, tokenizer, model:PreTrainedModel):
    """
    Generate embeddings for all categories from a dictionary of arrays.
    This function processes multiple arrays, each representing a category, and generates a mean vector for each category.
    The mean vectors are then concatenated to form a final vector representing all categories.
    Args:
        category_dict (dict): A dictionary where keys are category names and values are lists of words for those categories.
        tokenizer: The tokenizer used to process the words.
        model (PreTrainedModel): The pre-trained model used to generate word vectors.
    Returns:
        final_vector: A concatenated vector representing the mean vectors of all categories.
    """
    final_vector_array = []
    mbti_vector = get_mbti_vector(mbti)
    for category, words in category_dict.items():
        user_data = {"id": id}
        array_for_one_category = []
        for word in words:
            vector = get_word_vector(tokenizer, model, word)
            # Need to implement the checking with the predefined vectors
            array_for_one_category.append(vector)
        mean_vector = get_mean_vector_for_category(array_for_one_category)
        user_data[f"{category}_vector"] = format_vector_for_milvus(mean_vector)
        if category in ["interest","hobby","game"]:
            insert_vectors(global_vector_DB,f"{category}_vectors", user_data)
        elif category in ["music","movie","book"]: 
            insert_vectors(category_vector_DB,f"{category}_vectors", user_data)
        else:
            print("Category not found")
        final_vector_array.append(mean_vector)
    final_vector = concatenate_final_vector(final_vector_array)
    global_user_data =  {"id": id, "global_vector": format_vector_for_milvus(final_vector), "mbti_vector": format_vector_for_milvus(mbti_vector)}
    insert_vectors(global_vector_DB,"global_vectors", global_user_data)
    return "final_vector"


def get_mean_vector_for_category(array_of_vectors : list):
    """
    Computes the mean vector for a given category from a list of vectors.
    Args:
        array_of_vectors (list): A list of tensors representing vectors.
    Returns:
        torch.Tensor: A tensor representing the mean vector of the input vectors.
    """
    stacked_tensor = torch.stack(array_of_vectors)
    mean_tensor = torch.mean(stacked_tensor,dim=0)
    return mean_tensor

def concatenate_final_vector(final_vector : list):
    """
    Concatenates a list of tensors along the first dimension and reshapes the result.
    Args:
        final_vector (list): A list of tensors to be concatenated.
    Returns:
        torch.Tensor: A single tensor obtained by concatenating the input tensors along the first dimension and reshaping it to have a shape of (1, -1).
    """
    concatenated_tensor =  torch.cat(final_vector,dim=0)
    return concatenated_tensor.reshape(1,-1)

def format_vector_for_milvus(vector : torch.Tensor):
    """
    Formats a PyTorch tensor for insertion into a Milvus collection.
    Args:
        vector (torch.Tensor): The tensor to be formatted.
    Returns:
        list: The formatted vector as a list.
    """
    return vector.tolist()[0]

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
    return torch.tensor(mbti_vectors[mbti]).reshape(1, -1)
            
BERT = load_bert()
BERT_MODEL = BERT[1]
BERT_TOKENIZER = BERT[0]