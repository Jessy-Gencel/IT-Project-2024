from pymilvus import MilvusClient, DataType
from dotenv import load_dotenv
import os

load_dotenv()

CLUSTER_ENDPOINT = f"{os.getenv('MI_CLUSTER_ENDPOINT')}"
TOKEN = f"{os.getenv('MI_CLUSTER_TOKEN')}"

def make_connection():
    print(CLUSTER_ENDPOINT)
    client = MilvusClient(
        uri=CLUSTER_ENDPOINT,
        token=TOKEN 
    )
    return client



# The data for insert verctors should always be a dict consisting of the keys "primary_key" and "vectors"

def insert_vectors(client : MilvusClient,collection_name : str, userdata : dict):
    res = client.insert(
        collection_name=collection_name,
        data=userdata
    )
    return res



