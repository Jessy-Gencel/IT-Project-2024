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



