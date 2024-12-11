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

def find_profile_by_id(user_id: int):
    user_id = str(user_id)
    try:
        profile_document = get_collection("user-data", "profiles").get("profile::" + user_id)
        profile_data = profile_document.content_as[dict]
        profile_data["user_id"] = profile_document.key
        return profile_data
    
    except DocumentNotFoundException:
        print(f"Profile with ID {user_id} not found.")
        return None
    
    except CouchbaseException as e:
        print(f"An error occurred while retrieving profile with ID {user_id}: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

def find_event_by_id(event_id: int):
    event_id = str(event_id)
    try:
        event_document = get_collection("event-data", "events").get("event::" + event_id)
        event_data = event_document.content_as[dict]
        event_data["event_id"] = event_document.key
        return event_data
    
    except DocumentNotFoundException:
        print(f"Event with ID {event_id} not found.")
        return None
    
    except CouchbaseException as e:
        print(f"An error occurred while retrieving event with ID {event_id}: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
def find_message_by_id(message_id: int):
    message_id = str(message_id)
    try:
        message_document = get_collection("message-data", "messages").get("message::" + message_id)
        message_data = message_document.content_as[dict]
        message_data["message_id"] = message_document.key
        return message_data
    
    except DocumentNotFoundException:
        print(f"Message with ID {message_id} not found.")
        return None
    
    except CouchbaseException as e:
        print(f"An error occurred while retrieving message with ID {message_id}: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
def find_chat_by_id(chat_id: int):
    chat_id = str(chat_id)
    try:
        chat_document = get_collection("message-data", "chats").get("chat::" + chat_id)
        chat_data = chat_document.content_as[dict]
        chat_data["chat_id"] = chat_document.key
        return chat_data
    
    except DocumentNotFoundException:
        print(f"Chat with ID {chat_id} not found.")
        return None
    
    except CouchbaseException as e:
        print(f"An error occurred while retrieving chat with ID {chat_id}: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
