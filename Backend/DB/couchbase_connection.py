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
def find_all_users():
    try:
        query = "SELECT META().id, * FROM `user-data`.`users`"
        result = cluster.query(query)
        users = [row for row in result]
        return users

    except CouchbaseException as e:
        print(f"An error occurred while retrieving users: {e}")
        return []

    except Exception as e:
        print(f"Unexpected error: {e}")
        return []

def find_profile_by_id(profile_id):
    try: 
        profile_document = get_collection("user-data", "profiles").get("profile::" + profile_id)
        return profile_document.content_as[dict]

    except DocumentNotFoundException:
        print(f"Profile with ID {profile_id} not found")
        return None

    except CouchbaseException as e:
        print(f"An error occurred while retrieving profile with ID {profile_id}: {e}")
        return None
    
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
def find_all_profiles():
    try:
        query = "SELECT META().id, * FROM `user-data`.`profiles`"
        result = cluster.query(query)
        profiles = [row for row in result]
        return profiles

    except CouchbaseException as e:
        print(f"An error occurred while retrieving profiles: {e}")
        return []

    except Exception as e:
        print(f"Unexpected error: {e}")
        return []

def find_match_by_id(matching_id):
    try: 
        match_document = get_collection("user-data", "matches").get("match::" + matching_id)
        return match_document.content_as[dict]

    except DocumentNotFoundException:
        print(f"Match with ID {matching_id} not found")
        return None

    except CouchbaseException as e:
        print(f"An error occurred while retrieving match with ID {matching_id}: {e}")
        return None
    
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
def find_all_matches():
    try:
        query = "SELECT META().id, * FROM `user-data`.`matches`"
        result = cluster.query(query)
        matches = [row for row in result]
        return matches

    except CouchbaseException as e:
        print(f"An error occurred while retrieving matches: {e}")
        return []

    except Exception as e:
        print(f"Unexpected error: {e}")
        return []

def find_chat_by_id(conversation_id):
    try:
        chat_document = get_collection("user-data", "chats").get("chat::" + conversation_id)
        return chat_document.content_as[dict]
    
    except DocumentNotFoundException:
        print(f"Chat with ID {conversation_id} not found")
        return None

    except CouchbaseException as e:
        print(f"An error occurred while retrieving chat with ID {conversation_id}: {e}")
        return None
    
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
def find_all_chats():
    try:
        query = "SELECT META().id, * FROM `user-data`.`chats`"
        result = cluster.query(query)
        chats = [row for row in result]
        return chats

    except CouchbaseException as e:
        print(f"An error occurred while retrieving chats: {e}")
        return []

    except Exception as e:
        print(f"Unexpected error: {e}")
        return []
    
def find_messages_by_id(message_id):
    try: 
        message_document = get_collection("user-data", "messages").get("message::" + message_id)
        return message_document.content_as[dict]

    except DocumentNotFoundException:
        print(f"message with ID {message_id} not found")
        return None

    except CouchbaseException as e:
        print(f"An error occurred while retrieving message with ID {message_id}: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

def find_events_by_id(event_id):
    try:
        event_document = get_collection("event-data", "events").get("event::" + event_id)
        return event_document.content_as[dict]

    except DocumentNotFoundException:
        print(f"Event with ID {event_id} not found")
        return None 

    except CouchbaseException as e:
        print(f"An error occurred while retrieving event with ID {event_id}: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
def find_all_events():
    try:
        query = "SELECT META().id, * FROM `user-data`.`events`"
        result = cluster.query(query)
        events = [row for row in result]
        return events

    except CouchbaseException as e:
        print(f"An error occurred while retrieving events: {e}")
        return []

    except Exception as e:
        print(f"Unexpected error: {e}")
        return []