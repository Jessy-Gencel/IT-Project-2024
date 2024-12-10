from DB.couchbase_connection import cluster, db
from couchbase.collection import Collection
from couchbase.scope import Scope
from couchbase.exceptions import DocumentNotFoundException, CouchbaseException

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

def find_user_by_id(user_id: int):
    user_id = str(user_id)
    try:
        user_document = get_collection("user-data", "users").get("user::" + user_id)
        user_data = user_document.content_as[dict]
        user_data["user_id"] = user_document.key
        return user_data
    
    except DocumentNotFoundException:
        print(f"User with ID {user_id} not found.")
        return None
    
    except CouchbaseException as e:
        print(f"An error occurred while retrieving user with ID {user_id}: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
    
def store_user(user : dict):
    userid = user["user_id"]
    del user["user_id"]
    try:
        user_collection = get_collection("user-data", "users")
        user_collection.insert(f"user::{userid}", user)
        return find_user_by_id(userid)
    except CouchbaseException as e:
        print(f"An error occurred while storing the user: {e}")
        return None
