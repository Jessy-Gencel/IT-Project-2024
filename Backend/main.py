from flask import Flask
from DB.milvus_connection import make_connection, insert_vectors
from DB.couchbase_connection import connect_to_couchbase, get_collection,get_scope
from Services.embedding import load_bert, get_word_vector

app = Flask(__name__)

@app.route('/')
def home():
    vectorDB = make_connection()
    #couchbaseDB = connect_to_couchbase()
    tokenizer, model = load_bert()
    vector1 = get_word_vector(tokenizer,model,"ice skating").tolist()
    res = vectorDB.search(
        collection_name="BERT_test",     # target collection
        data=vector1,                # query vectors
    )
    print(res)
    return res


if __name__ == '__main__':
    app.run(debug=True)
