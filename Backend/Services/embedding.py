from transformers import BertTokenizer, BertModel, PreTrainedModel
from transformers.modeling_outputs import BaseModelOutputWithPoolingAndCrossAttentions
from DB.milvus_connection import MilvusClient, global_vector_DB, category_vector_DB, predefined_vector_DB1, predefined_vector_DB2
import numpy as np
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

def get_all_vectors(array_of_multiple_arrays : list,tokenizer,model:PreTrainedModel,save_to_milvus = False):
    """
    Generate embeddings for all categories from a list of arrays.
    This function processes multiple arrays, each representing a category, and generates a mean vector for each category.
    The mean vectors are then concatenated to form a final vector representing all categories.
    Args:
        array_of_multiple_arrays (list): A list of arrays, where each array contains words for a specific category.
        tokenizer: The tokenizer used to process the words.
        model (PreTrainedModel): The pre-trained model used to generate word vectors.
    Returns:
        final_vector: A concatenated vector representing the mean vectors of all categories.
    """
    final_vector_array = []
    for array in array_of_multiple_arrays:
        array_for_one_category = []
        for word in array:
            vector = get_word_vector(tokenizer,model,word)
            if save_to_milvus:
                #Need to implement the checking with the predefined vectors
                pass
            array_for_one_category.append(vector)
        mean_vector = get_mean_vector_for_category(array_for_one_category)
        if save_to_milvus:
            #Need to implement the write to the category vector DB
            pass
        final_vector_array.append(mean_vector)
    final_vector = concatenate_final_vector(final_vector_array)
    if save_to_milvus:
        #Need to implement the write to the global vector DB
        pass
    return final_vector


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

def format_vector_to_user_data(id : int, vectors : list, list_of_prefixes : list):
    """
    Formats user data for insertion into a Milvus collection.
    Args:
        id (int): The ID of the user.
        vector (list): The user's vector.
        list_of_prefixes (list): A list of prefixes for the vectors (words such as global,interest,game etc...).
    Returns:
        dict: The formatted user data.
    """
    user_data = {"id": id}
    for i in range(len(vectors)):
        user_data[f"{list_of_prefixes[i]}_vector"] = vectors[i]
    return user_data

