Event routes
============
This section documents the routes related to the events blueprint.

- **URL Prefix**: `/events`
- **Blueprint Name**: `events`

GET events
----------
- **Description**: Retrieves events from the database
- **Usage**: Used to load the events that match the users interests
- **Request**: event_id
- **Response**: Return a JSON object with the list of events
    - Each event includes:
        - date: Date
        - organizer: user_id
        - titel: string
        - description: string
        - participants: array<user_id>
        - location: string
        - event_id: int

POST events
-----------
- **Description**: Posting a event into the database
- **Usage**: When a organizer posts a event
- **Request**: 
    - organizer: user_id 
    - titel: string 
    - description: string
    - participants: array<user_id> 
    - location: string
- **Response**: Returns a success message confirming the event has been posted