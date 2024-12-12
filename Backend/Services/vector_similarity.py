from pymilvus import MilvusClient,AnnSearchRequest,WeightedRanker
from DB.milvus_connection import global_vector_DB,category_vector_DB,predefined_vector_DB1
import numpy as np


def get_global_matches(VDB : MilvusClient, amount_of_results : int, global_vector : list , mbti_vector : list, hobby_vector : list, interest_vector : list):
    requests = [make_ANN_request(global_vector, amount_of_results, "global_vector"), make_ANN_request(mbti_vector, amount_of_results, "mbti_vector"), 
                make_ANN_request(hobby_vector, amount_of_results, "hobby_vector"), make_ANN_request(interest_vector, amount_of_results, "interest_vector")]
    reranker = WeightedRanker(0.165,0.230,0.225,0.38)
    res = VDB.hybrid_search(collection_name = "global_vectors", reqs = requests, ranker = reranker, limit = amount_of_results)
    return res

def make_ANN_request(vector : list, amount_of_results : int, target_field : str):
    search_param = {
        "data" : vector,
        "anns_field" : target_field,
        "param" : {
            "metric_type": "COSINE",
            "params": {"nprobe": 10}
        },
        "limit" : amount_of_results
    }
    request = AnnSearchRequest(**search_param)
    return request
def get_by_id(id : int):
    res = global_vector_DB.get(collection_name="global_vectors", ids=id)
    return res

def curve_scores(scores, curve_type="exponential", **kwargs):
    # Normalize scores
    min_score = min(scores)
    max_score = max(scores)
    normalized_scores = [(s - min_score) / (max_score - min_score) for s in scores]
    
    # Apply curve
    if curve_type == "exponential":
        p = kwargs.get("power", 2)  # Default power is 2
        curved_scores = [n**p for n in normalized_scores]
    elif curve_type == "logarithmic":
        k = kwargs.get("scale", 10)  # Default scale is 10
        curved_scores = [np.log(k * n + 1) / np.log(k + 1) if n > 0 else 0 for n in normalized_scores]
    elif curve_type == "custom":
        a = kwargs.get("min_value", 20) / 100  # Default 20%
        b = kwargs.get("max_value", 95) / 100  # Default 95%
        curved_scores = [a + n * (b - a) for n in normalized_scores]
    else:
        raise ValueError("Invalid curve type specified.")
    
    # Map back to percentages
    final_scores = [round(c * 100, 1) for c in curved_scores]
    return final_scores
def check_with_predefined_vectors(category : str, vector : list):
    res = None
    if category == "game":
        res = category_vector_DB.search(collection_name=f"{category}_predefined_vectors", vector=vector, limit=5)
    else:
        res = predefined_vector_DB1.search(collection_name=f"{category}_predefined_vectors", vector=vector, limit=5)
    ids = [interest['id'] for interest in res['data'][0]]
    distances = [interest['distance'] for interest in res['data'][0]]
    print(ids)
    print(distances)
    return distances,ids

def make_category_bucket_array(similarities : list, ids : list):
    """
    Creates a bucket array for a given category from a list of vectors.
    Args:
        category (str): The category to create the bucket array for.
        array_of_vectors (list): A list of vectors.
    Returns:
        list: A list of dictionaries representing the bucket array for the category.
    """
    combined = list(zip(similarities, ids))
    combined_sorted = sorted(combined, key=lambda x: x[0], reverse=True)
    _, sorted_ids = zip(*combined_sorted)
    sorted_ids = list(sorted_ids)[:10]
    print(sorted_ids)
    return sorted_ids