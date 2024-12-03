from pymilvus import MilvusClient, DataType,FieldSchema, CollectionSchema, Collection
from dotenv import load_dotenv
import os

load_dotenv()

CLUSTER_ENDPOINT1 = f"{os.getenv('MI_CLUSTER_ENDPOINT')}"
TOKEN1 = f"{os.getenv('MI_CLUSTER_TOKEN')}"
CLUSTER_ENDPOINT2 = f"{os.getenv('MI_CLUSTER_ENDPOINT2')}"
TOKEN2 = f"{os.getenv('MI_CLUSTER_TOKEN2')}"
CLUSTER_ENDPOINT3 = f"{os.getenv('MI_CLUSTER_ENDPOINT3')}"
TOKEN3 = f"{os.getenv('MI_CLUSTER_TOKEN3')}"


def make_connection(connection_name : str):
    print(CLUSTER_ENDPOINT1)
    if connection_name == "global":
        client = MilvusClient(
            uri=CLUSTER_ENDPOINT1,
            token=TOKEN1 
        )
        return client
    elif connection_name == "category":
        client = MilvusClient(
            uri=CLUSTER_ENDPOINT2,
            token=TOKEN2
        )
        return client
    elif connection_name == "predefined_vectors1":
        client = MilvusClient(
            uri=CLUSTER_ENDPOINT3,
            token=TOKEN3
        )
        return client
    else:
        return None

global_vector_DB = make_connection("global") 
# global_vectors + interest_vectors + hobby_vectors + game_vectors
category_vector_DB = make_connection("category")
# book_vectors + movie_vectors + music_vectors + game_predefined_vectors
predefined_vector_DB1 = make_connection("predefined_vectors1")
# interest_predefined_vectors + hobby_predefined_vectors + book_predefined_vectors + movie_predefined_vectors + music_predefined_vectors 

