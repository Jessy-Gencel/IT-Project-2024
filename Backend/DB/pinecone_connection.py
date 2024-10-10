from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
import os
load_dotenv()

def connect_to_pinecone() -> Pinecone:
    pc = Pinecone(api_key=f"{os.getenv('PC_API_KEY')}")
    return pc



