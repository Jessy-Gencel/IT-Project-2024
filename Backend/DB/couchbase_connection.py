import traceback
import os
from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions
from couchbase.bucket import Bucket
from couchbase.collection import Collection
from couchbase.scope import Scope
from dotenv import load_dotenv
 
load_dotenv()

def connect_to_couchbase() -> Bucket:
	endpoint = f"{os.getenv("CB_ENDPOINT")}"
	username = f"{os.getenv("CB_USERNAME")}"
	password = f"{os.getenv("CB_PASSWORD")}" 
	bucket_name = f"{os.getenv("CB_BUCKET")}"


	auth = PasswordAuthenticator(username, password)
	options = ClusterOptions(auth)
	options.apply_profile("wan_development")
	try:
		cluster = Cluster(endpoint, options)
		cluster.wait_until_ready(timedelta(seconds=10))
		db = cluster.bucket(bucket_name)

		print("Connected to Couchbase Server")
		return db
	except Exception as e:
		traceback.print_exc()
		return None
		
def get_collection(db: Bucket,scope_name: str,collection_name: str) -> Collection:
	CB_collection = db.scope(scope_name).collection(collection_name)
	return CB_collection

def get_scope(db: Bucket,scope_name: str) -> Scope:
	CB_scope = db.scope(scope_name)
	return CB_scope
	