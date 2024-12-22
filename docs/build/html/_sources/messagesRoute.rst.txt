Message routes
============
This section documents the routes related to the messages blueprint.

- **URL Prefix**: `/messages`
- **Blueprint Name**: `messages`

GET messages
------------

- **Description**: Retrieves messages from the database.
- **Usage**: Used to load the chat history for a user
- **Request**: conversation_id
- **Response**: Returns a JSON object with the list of messages. 
    - Each message includes:
        - message_id: int
        - conversation_id: int
        - sender_id: int
        - content: string
        - timestamp: time

POST messages
-------------

- **Description**: Posting a message into the database.
- **Usage**: When a user sends a message.
- **Request**:
    - conversation_id: int
    - sender_id: int
    - content: string
- **Response**: Returns a success message after the message has been Post.
