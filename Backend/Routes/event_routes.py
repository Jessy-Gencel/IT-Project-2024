from flask import Blueprint, request, jsonify
from Services.couchbase_writes import store_event, update_participant

# Define the blueprint for events
event_bp = Blueprint('events', __name__, url_prefix='/events')

@event_bp.route('/events', methods=['GET'])
def get_events():
    # events = find_all_events()
    # return jsonify(events)
    return "Yippie events", 200

@event_bp.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    # event = find_events_by_id(event_id)
    # if event:
    #     return jsonify(event), 200
    # else:
    #     return jsonify({"error": "Event not found"}), 404
    return "Yippie events/event_id", 200

@event_bp.route('/', methods=['POST'])
def post_event():
    try:
        data = request.get_json()
        event = store_event(data)
        if event:
            return jsonify(event), 200 
        else:
            return jsonify({"error": "Event not posted"}), 404
    except Exception as e:
        print(f"An error occurred while posting the event: {e}")
        return jsonify({"error": "An error occurred while posting the event"}), 500

@event_bp.route('/participants', methods=['POST'])
def post_participant():
    try: 
        data = request.get_json()
        update_participant(data["event_id"], data["user_id"], data["is_going"])
        return jsonify({"message": "Participant updated"}), 200
    except Exception as e:
        print(f"An error occurred while updating the participant: {e}")
        return jsonify({"error": "An error occurred while updating the participant"}), 500
