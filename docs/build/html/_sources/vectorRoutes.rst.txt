Vector routes
=============

This section documents the routes related to the vector blueprint.

- **URL Prefix**: /vector
- **Blueprint name**: vector

POST vector/make
---------------

- **Description**: Creates a new vector.
- **Usage**: Generate or initialize a vector.
- **Request**: JSON with key of category and list of interest values
- **Response**: Returns a message indicating the vector was created

GET vector/get
--------------
- **Description**: Retrieves a vector
- **Usage**: Fetch the details of an existing vector
- **Request**: id
- **Response**: Returns a message indicating the vector was retrieved