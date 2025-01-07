from flask import Blueprint, request, jsonify
from Services.embedding import embed_MiniLM
from Services.couchbase_reads import get_interests

preset_bp = Blueprint('preset', __name__, url_prefix='/preset')


@preset_bp.route('/get', methods=['GET'])
def get_preset():
    lists = get_interests()
    return jsonify(lists), 200