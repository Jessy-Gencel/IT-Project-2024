from pymilvus import MilvusClient,AnnSearchRequest,WeightedRanker
from transformers import BertTokenizer, BertModel
from DB.milvus_connection import global_vector_DB

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
    reranker = WeightedRanker(0.1,0.30,0.30,0.30)
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