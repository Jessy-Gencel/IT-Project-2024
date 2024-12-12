from flask import Blueprint, request, jsonify
from Services.embedding import embed_MiniLM
from Services.couchbase_reads import get_predefined_lists

preset_bp = Blueprint('preset', __name__, url_prefix='/preset')


@preset_bp.route('/get', methods=['GET'])
def get_preset():
    lists = get_predefined_lists()
    return jsonify({
        "interests": lists.get("interests", []),
        "hobbies": lists.get("hobbies", []),
        "games": lists.get("games", []),
        "music": lists.get("music", []),
        "movies": lists.get("movies", []),
        "books": lists.get("books", [])
    })