import traceback
import os
from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions
from dotenv import load_dotenv
 
load_dotenv()

endpoint = f"{os.getenv("CB_ENDPOINT")}"
username = f"{os.getenv("CB_USERNAME")}"
password = f"{os.getenv("CB_PASSWORD")}" 
bucket_name = f"{os.getenv("CB_BUCKET")}"


auth = PasswordAuthenticator(username, password)
options = ClusterOptions(auth)
options.apply_profile("wan_development")
try:
	db = Cluster(endpoint, options)
	db.wait_until_ready(timedelta(seconds=10))
	print("Connected to Couchbase Server")
except Exception as e:
	traceback.print_exc()
	
def getWorkingCollection(scope_name,collection_name):
	CB_bucket = db.bucket(bucket_name)
	CB_collection = CB_bucket.scope(scope_name).collection(collection_name)
	return CB_collection
	