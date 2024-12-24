from couchbase.exceptions import CouchbaseException
from Services.couchbase_reads import find_user_by_id,find_profile_by_id,find_event_by_id,find_chat_by_id,get_collection
from Utils.id_generator import add_id_to_document

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
    profile_with_id = add_id_to_document(profile,"user-data","profiles")
    print(profile_with_id)
    try:
        profile_collection = get_collection("user-data", "profiles")
        profile_collection.insert(f"profile::{profile_with_id['id']}", profile_with_id)
        return find_profile_by_id(profile_with_id["id"])
    except CouchbaseException as e:
        print(f"An error occurred while storing the profile: {e}")
        return None
def store_event(event : dict):
    eventid = event["event_id"]
    del event["event_id"]
    try:
        user_collection = get_collection("event-data", "events")
        user_collection.insert(f"event::{eventid}", event)
        return find_event_by_id(eventid)
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
        collection.insert(room)
        print('room stored')
        return True

    except CouchbaseException as e:
        print(f"An error occurred while storing the room: {e}")
        return None