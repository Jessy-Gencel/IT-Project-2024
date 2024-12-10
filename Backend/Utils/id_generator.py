from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.exceptions import CouchbaseException


cluster = Cluster('couchbase://localhost', PasswordAuthenticator('username', 'password'))
bucket = cluster.bucket('bucket_name')
collection = bucket.default_collection()

def generate_id(collection):
    
    """
    Generate a unique ID for a Couchbase collection using an atomic counter.

    Args:
        collection: The Couchbase collection object.
    
    Returns:
        int: The generated ID or None in case of an error.
    """

    counter_key = f'counter:{collection.name}'
    try:
        result = collection.binary().increment(counter_key, delta=1, initial=1)
        return result.content
    except CouchbaseException as e:
        print(f"Error generating ID: {e}")
        return None
    
