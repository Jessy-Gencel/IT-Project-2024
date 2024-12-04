from flask import Blueprint, request, jsonify
from Services.embedding import embed_MiniLM

vector_bp = Blueprint('vector', __name__, url_prefix='/vector')

@vector_bp.route('/make', methods=['POST'])
def make_vector():
    # Example data
    #vectors = {
        #"interest": ["running", "parkouring"],
        #"game": ["zumba", "tower defense"],
        #"music": ["heavy metal", "nothing by fabvl"],
        #"movie": ["Lord of the rings", "Harry Potter"],
        #"hobby": ["ice skating, reading"],
        #"book": ["Erebos"]
    #}
    #mbti = "INFP"
    #make_all_vectors(vectors, mbti, 2, BERT_TOKENIZER, BERT_MODEL)
    return jsonify({"message": "Vector created"})

@vector_bp.route('/get', methods=['GET'])
def get_vector():
    # Example data
    #vector = get_by_id(2)
    #global_vector = vector[0]["global_vector"]
    #mbti_vector = vector[0]["mbti_vector"]
    #res = get_global_matches(global_vector_DB, 5, [global_vector], [mbti_vector])
    #print(res)
    return jsonify({"message": "Vector retrieved"})
