from flask import Blueprint, request, jsonify
from DB.couchbase_connection import find_events_by_id, find_all_events

# Define the blueprint for events
event_bp = Blueprint('events', __name__, url_prefix='/events')

@event_bp.route('/events', methods=['GET'])
def get_events():
    events = find_all_events()
    return jsonify(events)

@event_bp.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = find_events_by_id(event_id)
    if event:
        return jsonify(event), 200
    else:
        return jsonify({"error": "Event not found"}), 404

@event_bp.route('/', methods=['POST'])
def post_event():
    # Logic for creating or posting an event
    return jsonify({"message": "Event posted"})
