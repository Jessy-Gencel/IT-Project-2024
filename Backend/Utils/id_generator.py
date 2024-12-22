from couchbase.exceptions import CouchbaseException
from Services.couchbase_reads import get_collection
from couchbase.options import IncrementOptions, SignedInt64

def generate_id(scope : str,collection : str):
    
    """
    Generate a unique document ID for a Couchbase collection using an atomic counter.
    
    This function retrieves the collection using the provided scope and collection name,
    then uses a binary counter to generate a unique ID by incrementing a counter value. 
    The counter is stored as a key in the format 'counter:<collection_name>'.

    Args:
        scope: The scope in which the collection resides.
        collection: The name of the collection.

    Returns:
        int: The generated document ID, or None if an error occurs.
    """
    collection_cb = get_collection(scope_name=scope, collection_name=collection)
    counter_key = f'counter:{collection_cb.name}'
    print(counter_key)
    try:
        result = collection_cb.binary().increment(counter_key,IncrementOptions(initial=SignedInt64(1)))
        print(result.content)
        return result.content   
    except CouchbaseException as e:
        print(f"Error generating ID: {e}")
        return None
    
def add_id_to_document(collection_dict : dict, scope : str, collection : str):
    """
    Adds a generated ID to an existing document in the collection dictionary.
    
    This function generates a unique ID based on the provided scope and collection, 
    and stores it in the document dictionary with a field name based on the provided prefix.

    Args:
        collection_dict: The dictionary representing the document to which the ID will be added.
        prefix: The prefix to be used for the ID field.
        scope: The scope within which the ID is generated.
        collection: The collection name within the specified scope where the ID is generated.

    Returns:
        dict: The updated collection dictionary with the new ID field added.
    """

    collection_dict[f"id"] = f"{generate_id(scope=scope,collection=collection)}"
    return collection_dict

