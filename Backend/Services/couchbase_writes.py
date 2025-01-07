from couchbase.exceptions import CouchbaseException
from Services.couchbase_reads import find_user_by_id, find_profile_by_id, find_event_by_id, find_chat_by_id,get_collection
from Utils.id_generator import add_id_to_document, generate_id
from couchbase.options import ReplaceOptions

def store_user(user : dict):
    user_with_id = add_id_to_document(user,"user-data","users")
    try:
        user_collection = get_collection("user-data", "users")
        print(user_with_id)
        user_collection.insert(f"user::{user_with_id["id"]}", user_with_id)
        return find_user_by_id(user_with_id["id"])
    except CouchbaseException as e:
        print(f"An error occurred while storing the user: {e}")
        return None
    
def store_profile(profile : dict):
    try:
        profile_collection = get_collection("user-data", "profiles")
        profile_collection.insert(f"profile::{profile['id']}", profile)
        return find_profile_by_id(profile["id"])
    except CouchbaseException as e:
        print(f"An error occurred while storing the profile: {e}")
        return None
    
def store_event(event : dict):
    # eventid = event["event_id"]
    # del event["event_id"]
    try:
        event_id = generate_id("event-data", "events")
        event["id"] = event_id
        event["participants"] = []

        user_collection = get_collection("event-data", "events")
        user_collection.insert(f"event::{event_id}", event)

        return find_event_by_id(event_id)
    except CouchbaseException as e:
        print(f"An error occurred while storing the event: {e}")
        return None
    
def store_chats(message : dict):
    message_with_id = add_id_to_document(message,"user-data","chats")
    try:
        print(message_with_id)
        user_collection = get_collection("user-data", "chats")
        user_collection.insert(f"message::{message_with_id["id"]}", message)
        print("jdsfhsdjkjk")
        return find_chat_by_id(message_with_id["id"])
    except CouchbaseException as e:
        print(f"An error occurred while storing the message: {e}")
        return None
    
def store_room(room: str):
    try:
        collection = get_collection("user-data", "chats")
        collection.insert(room, {"room_id": room})
        print('room stored')
        return True

    except CouchbaseException as e:
        print(f"An error occurred while storing the room: {e}")
        return None
    

def deep_merge(existing: dict, updates: dict):
    """Recursively merges "updates" into "existing"."""
    for key, value in updates.items():
        if isinstance(value, dict) and key in existing:
            deep_merge(existing[key], value)
        else:
            existing[key] = value
    
def update_profile(user_id:str, things_to_update:dict):
    collection = get_collection("user-data", "profiles")
    raw_data = collection.get(f"profile::{user_id}")
    current_profile = raw_data.content_as[dict]
    current_cas = raw_data.cas

    deep_merge(current_profile, things_to_update)
    try:
        new_profile = collection.replace(f"profile::{user_id}", current_profile, ReplaceOptions(cas=current_cas))
        return new_profile.value
    except CouchbaseException as e:
        print(f"An error occurred while updating the profile: {e}")
        return None




    
def store_message(room_id: str, sender_id: int, message: str, timestamp: str):
    message_id = generate_id("user-data", "messages")
    message_id = str(message_id)
    try:
        collection = get_collection("user-data", "messages")
        document = {
            "message_id": message_id,
            "room_id": room_id,
            "sender_id": sender_id,
            "message": message,
            "timestamp": timestamp
        }
        collection.insert(f"message::{message_id}", document)
        print("stored")
        return message_id
    
    except CouchbaseException as e:
        print(f"Failed to store message: ", e)
        return None
    
def update_participant(event_id: int, user_id: int, is_going: bool):
    event = find_event_by_id(event_id)
    print(user_id)
    print(event)
    
    if is_going and user_id not in event['participants']:
        event['participants'].append(user_id)
    elif user_id in event['participants'] and not is_going:
        event['participants'].remove(user_id)


    try:
        collection = get_collection("event-data", "events")
        collection.replace(f"event::{event_id}", event)
        return True
    except CouchbaseException as e:
        print(f"An error occurred while updating the participant: {e}")
        return False
