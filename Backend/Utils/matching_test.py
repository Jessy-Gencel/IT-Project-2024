from Services.vector_similarity import get_by_id,get_global_matches,curve_scores,get_by_id
from DB.milvus_connection import global_vector_DB

vector = get_by_id(5)
global_vector = [vector[0]["global_vector"]]
mbti_vector = [vector[0]["mbti_vector"]]
hobby_vector = [vector[0]["hobby_vector"]]
interest_vector = [vector[0]["interest_vector"]]
res = get_global_matches(global_vector_DB, 10, global_vector, mbti_vector, hobby_vector, interest_vector)
print(res[0])
scores = [score["distance"] for score in res[0]]
ids = [score["id"] for score in res[0]]
print(scores)
print(ids)