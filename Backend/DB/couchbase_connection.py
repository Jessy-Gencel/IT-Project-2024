import traceback
import os
from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions
from couchbase.bucket import Bucket
from couchbase.collection import Collection
from couchbase.scope import Scope
from couchbase.exceptions import DocumentNotFoundException, CouchbaseException

from dotenv import load_dotenv
 
load_dotenv()

def connect_to_couchbase() -> tuple[Bucket, Cluster]:
	endpoint = f"{os.getenv('CB_ENDPOINT')}"
	username = f"{os.getenv('CB_USERNAME')}"
	password = f"{os.getenv('CB_PASSWORD')}"
	bucket_name = f"{os.getenv('CB_BUCKET')}"

	auth = PasswordAuthenticator(username, password)
	options = ClusterOptions(auth)
	options.apply_profile("wan_development")
	try:
		cluster = Cluster(endpoint, options)
		cluster.wait_until_ready(timedelta(seconds=10))
		db = cluster.bucket(bucket_name)

		print("Connected to Couchbase Server")
		return db, cluster
	except Exception as e:
		traceback.print_exc()
		return None, None

db, cluster = connect_to_couchbase()


def get_collection(scope_name: str,collection_name: str) -> Collection:
	CB_collection = db.scope(scope_name).collection(collection_name)
	return CB_collection

def get_scope(scope_name: str) -> Scope:
	CB_scope = db.scope(scope_name)
	return CB_scope

def find_user_by_email(email: str):
    try:
        query = "SELECT * FROM `user-data`.`users` WHERE email = $email"
        result = cluster.query(query, email=email)
        if result.rows:
            return result.rows[0]
        else:
            print(f"User with email {email} not found.")
            return None
        
    except CouchbaseException as e:
        print(f"An error occurred while querying the database: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

def find_user_by_id(user_id: str):
    try:
        user_document = get_collection("user-data", "users").get("user::" + user_id)
        return user_document.content_as[dict]
    
    except DocumentNotFoundException:
        print(f"User with ID {user_id} not found.")
        return None
    
    except CouchbaseException as e:
        print(f"An error occurred while retrieving user with ID {user_id}: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
def store_user():
	pass