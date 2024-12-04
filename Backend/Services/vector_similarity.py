from pymilvus import MilvusClient,AnnSearchRequest,WeightedRanker
from DB.milvus_connection import global_vector_DB
import numpy as np

def get_top_n_vectors(VDB : MilvusClient,amount_of_results : int, query_vector : list):
    res = VDB.search(
        collection_name="BERT_test",
        data=query_vector,
        top_k=amount_of_results
    )
    return res
def get_global_matches(VDB : MilvusClient, amount_of_results : int, global_vector : list , mbti_vector : list, hobby_vector : list, interest_vector : list):
    requests = [make_ANN_request(global_vector, amount_of_results, "global_vector"), make_ANN_request(mbti_vector, amount_of_results, "mbti_vector"), 
                make_ANN_request(hobby_vector, amount_of_results, "hobby_vector"), make_ANN_request(interest_vector, amount_of_results, "interest_vector")]
    reranker = WeightedRanker(0.165,0.230,0.225,0.38)
    res = VDB.hybrid_search(collection_name = "test_vectors", reqs = requests, ranker = reranker, limit = amount_of_results)
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
    res = global_vector_DB.get(collection_name="test_vectors", ids=id)
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
