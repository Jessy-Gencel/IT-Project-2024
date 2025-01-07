from pymilvus import MilvusClient,AnnSearchRequest,WeightedRanker
from DB.milvus_connection import global_vector_DB,category_vector_DB,predefined_vector_DB1
import numpy as np
from Utils.expected_database_keywords import VECTOR_FIELDS,GLOBAL_VECTOR_FIELDS

def get_global_matches(userid : int,amount_of_results : int, global_vector : list , mbti_vector : list, hobby_vector : list, interest_vector : list,black_list : list = []):
    black_list.append(userid)
    print(black_list)
    requests = [make_ANN_request(global_vector, amount_of_results, "global_vectors",black_list), 
                make_ANN_request(mbti_vector, amount_of_results, "mbti_vectors",black_list), 
                make_ANN_request(hobby_vector, amount_of_results, "hobby_vectors",black_list), 
                make_ANN_request(interest_vector, amount_of_results, "interest_vectors",black_list)]
    reranker = WeightedRanker(0.165,0.230,0.225,0.38)
    res = global_vector_DB.hybrid_search(collection_name = "global_vectors", reqs = requests, ranker = reranker, 
                                         limit = amount_of_results)
    black_list.remove(userid)
    return res[0]

def make_ANN_request(vector : list, amount_of_results : int, target_field : str,black_list : list = []):
    search_param = {
        "data" : vector,
        "anns_field" : target_field,
        "param" : {
            "metric_type": "COSINE",
            "params": {"nprobe": 10}
        },
        "limit" : amount_of_results,
        "expr" : f"id not in {black_list}"
    }
    request = AnnSearchRequest(**search_param)
    return request
def get_by_id(id : int,db_name = "global_vector_DB" ,collection_name : str ="global_vectors"):
    if db_name == "global_vector_DB":
        res = global_vector_DB.get(collection_name=collection_name, ids=id)
    elif db_name == "category_vector_DB":
        res = category_vector_DB.get(collection_name=collection_name, ids=id)
    else:
        res = predefined_vector_DB1.get(collection_name=collection_name, ids=id)
    return res
def get_by_category_and_id(category : str, id : int):
    if category == "game":
        res = category_vector_DB.get(collection_name=f"{category}_predefined_vectors", ids=id, output_fields=["word"])
    else:
        res = predefined_vector_DB1.get(collection_name=f"{category}_predefined_vectors", ids=id, output_fields=["word"])
    return res[0]["word"]


def check_with_predefined_vectors(category : str, vector : list,make_bucket : bool = True):
    vector = [vector]
    res = None
    if category == "game":
        res = category_vector_DB.search(collection_name=f"{category}_predefined_vectors", data=vector, limit=5,output_fields=["id","distance","word"])
    else:
        res = predefined_vector_DB1.search(collection_name=f"{category}_predefined_vectors", data=vector, limit=5,output_fields=["id","distance","word"])
    if make_bucket:
        print(res[0])
        ids = [interest['entity']["word"] for interest in res[0]]
        distances = [interest['distance'] for interest in res[0]]
        return distances,ids
    else:
        return res[0]


def get_category_matches(id : int, db_name : str = "global_vector_DB", collection_name : str = "global_vectors",black_list : list = []):
    black_list.append(id)
    user_vector = get_by_id(id=id,db_name=db_name,collection_name=collection_name)[0]
    if db_name == "global_vector_DB":
        res = global_vector_DB.search(collection_name=collection_name, data=user_vector, limit=5,filter=f"id not in {black_list}")
        pass
    elif db_name == "category_vector_DB":
        res = category_vector_DB.search(collection_name=collection_name, data=user_vector, limit=5,filter=f"id not in {black_list}")
    else:
        print("Brother what DB are you trying to access?!?!?!")
    return res[0]

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
    print("These are the sorted IDS")
    print(sorted_ids)
    return sorted_ids

def control_function_matching(category : str, sorted_ids : list):
    best_matches = [f"{category} best matches in order:"]
    for id in sorted_ids:
        word = get_by_category_and_id(category, id)
        best_matches.append({"word": word})
    print(best_matches)

def match_with_one_specific_user(user_id : int, other_user_id : int):
    global_vector_components = get_by_id(user_id)[0]
    user_vectors = {
        "mbti" : global_vector_components["mbti_vectors"],
        "hobby" : global_vector_components["hobby_vectors"],
        "interest" : global_vector_components["interest_vectors"],
    }
    for field in GLOBAL_VECTOR_FIELDS:
        slice_global_vector_for_category(global_vector_components["global_vectors"],field,user_vectors)

    matching_percentages = {}
    print(user_vectors)
    for vector_field in VECTOR_FIELDS:
        if vector_field in ["mbti","hobby","interest","game"]:
            res = global_vector_DB.search(collection_name=f"{vector_field}_vectors", data=[user_vectors[f"{vector_field}"]], limit=1,filter=f"id == {other_user_id}")[0]
            print(res[0])
            matching_percentages[vector_field] = int(round(float(res[0]["distance"]),2) * 100)
        elif vector_field in ["movie","book","music"]:
            res = category_vector_DB.search(collection_name=f"{vector_field}_vectors", data=[user_vectors[f"{vector_field}"]], limit=1,filter=f"id == {other_user_id}")[0]
            print(res[0])
            matching_percentages[vector_field] = int(round(float(res[0]["distance"]),2) * 100)
        else: 
            print("Brother what field are you trying to access?!?!?!")
    return matching_percentages


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


