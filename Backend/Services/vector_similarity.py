from pymilvus import MilvusClient
from transformers import BertTokenizer, BertModel

def get_top_n_vectors(VDB : MilvusClient,amount_of_results : int, query_vector : list):
    res = VDB.search(
        collection_name="BERT_test",
        data=query_vector,
        top_k=amount_of_results
    )
    return res