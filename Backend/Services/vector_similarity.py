from pymilvus import MilvusClient,AnnSearchRequest,WeightedRanker
from DB.milvus_connection import global_vector_DB,category_vector_DB,predefined_vector_DB1
import numpy as np


def get_global_matches(userid : int,amount_of_results : int, global_vector : list , mbti_vector : list, hobby_vector : list, interest_vector : list):
    requests = [make_ANN_request(global_vector, amount_of_results, "global_vectors"), 
                make_ANN_request(mbti_vector, amount_of_results, "mbti_vectors"), 
                make_ANN_request(hobby_vector, amount_of_results, "hobby_vectors"), 
                make_ANN_request(interest_vector, amount_of_results, "interest_vectors")]
    reranker = WeightedRanker(0.165,0.230,0.225,0.38)
    res = global_vector_DB.hybrid_search(collection_name = "global_vectors", reqs = requests, ranker = reranker, 
                                         limit = amount_of_results)
    for result in res[0]:
        print(result)
        print(userid)
        print(type(result["id"]))
        print(type(userid))
        if result["id"] == int(userid):
            res[0].remove(result)
            break
    return res[0]

def make_ANN_request(vector : list, amount_of_results : int, target_field : str):
    search_param = {
        "data" : vector,
        "anns_field" : target_field,
        "param" : {
            "metric_type": "COSINE",
            "params": {"nprobe": 10}
        },
        "limit" : amount_of_results,
    }
    request = AnnSearchRequest(**search_param)
    return request
def get_by_id(id : int):
    res = global_vector_DB.get(collection_name="global_vectors", ids=id)
    return res
def get_by_category_and_id(category : str, id : int):
    if category == "game":
        res = category_vector_DB.get(collection_name=f"{category}_predefined_vectors", ids=id, output_fields=["word"])
    else:
        res = predefined_vector_DB1.get(collection_name=f"{category}_predefined_vectors", ids=id, output_fields=["word"])
    return res[0]["word"]

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
    vector = [vector]
    res = None
    if category == "game":
        res = category_vector_DB.search(collection_name=f"{category}_predefined_vectors", data=vector, limit=5)
    else:
        res = predefined_vector_DB1.search(collection_name=f"{category}_predefined_vectors", data=vector, limit=5)
    #print(res)
    ids = [interest['id'] for interest in res[0]]
    distances = [interest['distance'] for interest in res[0]]
    #print(ids)
    #print(distances)
    return distances,ids

def make_category_bucket_array(similarities : list, ids : list, category : str):
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
    #control_function_matching(category, sorted_ids)
    #print("These are the sorted IDS")
    #print(sorted_ids)
    return sorted_ids

def control_function_matching(category : str, sorted_ids : list):
    best_matches = [f"{category} best matches in order:"]
    for id in sorted_ids:
        word = get_by_category_and_id(category, id)
        best_matches.append({"word": word})
    print(best_matches)