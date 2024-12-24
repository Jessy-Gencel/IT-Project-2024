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

def transform_presets(presets_list):
    """
    Transform a list of preset dictionaries into a single dictionary
    with category names as keys and their corresponding lists as values.
    
    Args:
        presets_list (list): A list of dictionaries containing preset categories
    
    Returns:
        dict: A dictionary with category names and their lists
    """
    result = {}
    
    for preset_dict in presets_list:
        for category, items in preset_dict.get('presets', {}).items():
            result[category] = items
    
    return result

def get_predefined_lists():
    try:
        query = "SELECT * FROM `ehb-link`.`service-data`.presets"
        result = cluster.query(query)
        rows = list(result)  # Convert result to a list
        if rows:
            return transform_presets(rows)  # Return the first predefined lists record
        else:
            print(f"Predefined lists not found.")
            return None
        
    except CouchbaseException as e:
        print(f"An error occurred while querying the database: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
def find_user_by_email(email: str):
    try:
        query = "SELECT * FROM `ehb-link`.`user-data`.users WHERE email = $email"
        result = cluster.query(query, email=email)
        rows = list(result)  # Convert result to a list
        if rows:
            return rows[0]["users"]  # Return the first user record
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

def find_chat_by_id(chat_id: int):
    chat_id = str(chat_id)
    try:
        chat_document = get_collection("user-data", "chats").get("chat::" + chat_id)
        chat_data = chat_document.content_as[dict]
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
    
# def find_chat(user1_id: int, user2_id: int):
#     try:
#         chat = get_collection("user-data", "chats").get("")
#                 query = "SELECT * FROM `ehb-link`.`user-data`.chats WHERE user1 = $user1, user2 = $user2 OR WHERE user1 = $user2, user2 = $user1"

def get_user_chats(user_id: int):
    
    #fetch a users first and last name
    user_query = f"SELECT first_name, last_name FROM `ehb-link`.`user-data`.users WHERE id = '{user_id}'"
    user_data = cluster.query(user_query).execute()
    user_list = [row for row in user_data]
    
    #fetch all chats where the user is involved
    chats_query = f"SELECT * FROM `ehb-link`.`user-data`.`chats` WHERE room_id LIKE 'room:{user_id}:%' OR chat_id LIKE 'room:%:{user_id}'"
    chats_data = cluster.query(chats_query).execute()
    chats_list = [row for row in chats_data]

    # still need to fetch the pfp but the documents dont have them yet (just fetching all the data for now)
    profile = find_profile_by_id(user_id)
    if profile is None:
        print(f"Profile with ID {user_id} not found.")
        return None
    result = {
        "user": user_list,
        "chats": chats_list,
        "profile": profile
    }

    return result

def check_room_exists(room: str):
    query = f"SELECT room_id FROM `ehb-link`.`user-data`.`chats` WHERE room_id = '{room}'"
    query_data = cluster.query(query).execute()

    if query_data is None:
        print('room does not exist')
        return False
    else:
        print('room exists')
        return True