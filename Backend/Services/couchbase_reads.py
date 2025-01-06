from DB.couchbase_connection import cluster, db
from couchbase.collection import Collection
from couchbase.scope import Scope
from couchbase.exceptions import DocumentNotFoundException, CouchbaseException
from Services.matching import find_global_top_matches

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
    
def get_users_with_matching_categories(category : str, vector_ids : list):
    valid_categories = ["book", "game", "hobby", 
                        "interest", "movie", "music"]
    if category not in valid_categories:
        raise ValueError(f"Invalid category: {category}")
    try:
        query = f"""
            SELECT *
            FROM `ehb-link`.`user-data`.profiles AS user
            WHERE ANY vector_id IN {vector_ids} 
                SATISFIES vector_id IN user.trait_vectors.{category}_vectors
            END;
            """
        result = cluster.query(query)
        rows = list(result) 
        if rows:
            return rows 
        else:
            print(f"Users with matching {category} vectors not found.")
            return None
        
    except CouchbaseException as e:
        print(f"An error occurred while querying the database: {e}")
        return None

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
    
def order_users_by_matches(category: str, vector_ids: list, user_rows: list):
    """
    Orders users by the number of matching vector IDs in the given category.

    Args:
        category (str): The category to check (e.g., "book", "game").
        vector_ids (list): The list of vector IDs to match against.
        user_rows (list): The result of `get_users_with_matching_categories`.

    Returns:
        list: A list of users sorted by the number of matches (descending), 
              with match details for each user.
    """
    if not user_rows:
        print("No user rows provided for processing.")
        return []
    
    user_matches = []
    for row in user_rows:
        user_id = row.get("user", {}).get("id", "unknown_user") 
        user_vectors = row.get("user", {}).get("trait_vectors", {}).get(f"{category}_vectors", [])
        matching_vectors = set(vector_ids) & set(user_vectors)
        match_count = len(matching_vectors)
        if match_count > 0: 
            user_matches.append({
                "user_id": user_id,
                "match_count": match_count,
                "matching_vectors": list(matching_vectors)
            })
    user_matches.sort(key=lambda x: x["match_count"], reverse=True)

    return user_matches


# def find_chat(user1_id: int, user2_id: int):
#     try:
#         chat = get_collection("user-data", "chats").get("")
#                 query = "SELECT * FROM `ehb-link`.`user-data`.chats WHERE user1 = $user1, user2 = $user2 OR WHERE user1 = $user2, user2 = $user1"

def get_user_chats(user_id: int):
    print('get_user_chats')
    try:
        query = f"SELECT * FROM `ehb-link`.`user-data`.`chats` WHERE room_id LIKE 'room:{user_id}:%' OR room_id LIKE 'room:%:{user_id}'"
        query_data = cluster.query(query).execute()
        print(query_data)
        rooms_list = [row["chats"] for row in query_data]
        print("rooms: ", rooms_list)
        
        # Make array with other chat user id's and get their profile data
        user_ids_list = [
        str(num)
        for item in rooms_list
        for num in item['room_id'].split(':')[1:]
        if int(num) != user_id
        ]
        print(user_ids_list)
        
        user_query = f"SELECT name, id, pfp FROM `ehb-link`.`user-data`.`profiles` WHERE id IN [{', '.join([f"'{id}'" for id in user_ids_list])}]"
        print(user_query)
        user_data = cluster.query(user_query).execute()
        print(user_data)
        user_list = [row for row in user_data]
        
        return user_list
    
    except CouchbaseException as e:
        print(f"An error occurred while retrieving the rooms for user_id {user_id}: {e}")
        return None
    

    
    #fetch all chats where the user is involved
    # chats_query = f"SELECT * FROM `ehb-link`.`user-data`.`chats` WHERE room_id = 'room:{user_id}:%' OR chat_id = 'room:%:{user_id}'"
    # chats_data = cluster.query(chats_query).execute()
    # chats_list = [row for row in chats_data]

    # still need to fetch the pfp but the documents dont have them yet (just fetching all the data for now)
    # profile = find_profile_by_id(user_id)
    # if profile is None:
    #     print(f"Profile with ID {user_id} not found.")
    #     return None
    # result = {
    #     "user": user_list,
    #     "chats": chats_list,
    #     "profile": profile
    # }

    return user_list

def check_room_exists(room: str):
    query = f"SELECT room_id FROM `ehb-link`.`user-data`.`chats` WHERE room_id = '{room}'"
    query_data = cluster.query(query).execute()
    
    if not query_data:
        print('room does not exist')
        return False
    else:
        print('room exists')
        return True
    
def get_room_messages(room: str):
    try:
        query = f"SELECT * FROM `ehb-link`.`user-data`.`messages` WHERE room_id = '{room}'"
        query_data = cluster.query(query).execute()
        messages_list = [row['messages'] for row in query_data]
        
        return messages_list

    except CouchbaseException as e:
        print(f"An error occurred while retrieving messages from room {room}: {e}")
        return None
    
def word_matches_with_specific_user(user_id: int, other_user_id: int):
    try:
        current_user_trait_vectors = find_profile_by_id(user_id)["trait_vectors"]
        other_user_trait_vectors = find_profile_by_id(other_user_id)["trait_vectors"]
        matching_vectors = find_global_top_matches(current_user_trait_vectors, other_user_trait_vectors)
        print(matching_vectors)
        return matching_vectors, 200
    
    except CouchbaseException as e:
        print(f"An error occurred while retrieving word matches with user {other_user_id}: {e}")
        return None