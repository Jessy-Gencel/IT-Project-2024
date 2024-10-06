from django.db import models
from bson import ObjectId


# Create your models here.
from backend.settings import db

def get_user():
    user_id = '59b99db4cfa9a34dcd7885b6'
    user_object_id = ObjectId(user_id)
    users_collection = db['users']  # Access the users collection
    user_document = users_collection.find_one({"_id": user_object_id}, {"name": 1})
    if user_document:
        user_name = user_document.get("name")  # Access the 'name' field
        return user_name
    else:
        print("User not found.")