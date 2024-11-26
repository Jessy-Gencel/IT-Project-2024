from pymilvus import MilvusClient, DataType
from dotenv import load_dotenv
import os

load_dotenv()

CLUSTER_ENDPOINT1 = f"{os.getenv('MI_CLUSTER_ENDPOINT')}"
TOKEN1 = f"{os.getenv('MI_CLUSTER_TOKEN')}"
CLUSTER_ENDPOINT2 = f"{os.getenv('MI_CLUSTER_ENDPOINT2')}"
TOKEN2 = f"{os.getenv('MI_CLUSTER_TOKEN2')}"
CLUSTER_ENDPOINT3 = f"{os.getenv('MI_CLUSTER_ENDPOINT3')}"
TOKEN3 = f"{os.getenv('MI_CLUSTER_TOKEN3')}"
CLUSTER_ENDPOINT4 = f"{os.getenv('MI_CLUSTER_ENDPOINT4')}"
TOKEN4 = f"{os.getenv('MI_CLUSTER_TOKEN4')}"

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
    elif connection_name == "predefined_vectors2":
        client = MilvusClient(
            uri=CLUSTER_ENDPOINT4,
            token=TOKEN4
        )
        return client
    else:
        return None

global_vector_DB = make_connection("global")
category_vector_DB = make_connection("category")
predefined_vector_DB1 = make_connection("predefined_vectors1")
predefined_vector_DB2 = make_connection("predefined_vectors2")

