import traceback
import os
from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions
from couchbase.bucket import Bucket


from dotenv import load_dotenv
 
load_dotenv()

def connect_to_couchbase() -> tuple[Bucket, Cluster]:
	endpoint = f"{os.getenv('CB_ENDPOINT')}"
	username = f"{os.getenv('CB_USERNAME')}"
	password = f"{os.getenv('CB_PASSWORD')}"
	bucket_name = f"{os.getenv('CB_BUCKET')}"
	print(f"Connecting to Couchbase Server at {endpoint} with username {username} and bucket {bucket_name}")
	auth = PasswordAuthenticator(username, password)
	options = ClusterOptions(auth)
	print(options)
	options.apply_profile("wan_development")
	try:
		print(options)
		cluster = Cluster(endpoint, options)
		print(cluster)
		cluster.wait_until_ready(timedelta(seconds=10))
		db = cluster.bucket(bucket_name)

		print("Connected to Couchbase Server")
		return db, cluster
	except Exception as e:
		traceback.print_exc()
		return None, None

db, cluster = connect_to_couchbase()


