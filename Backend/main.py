from flask import Flask
from DB.milvus_connection import make_connection
from DB.couchbase_connection import connect_to_couchbase, get_collection,get_scope
from Services.embedding import load_bert, get_word_vector

app = Flask(__name__)

@app.route('/')
def home():
    #vectorDB = make_connection()
    #couchbaseDB = connect_to_couchbase()
    tokenizer, model = load_bert()
    vector1 = get_word_vector(tokenizer,model,"ice skating")
    print(type(vector1))
    print(vector1)
    return [1,2]


if __name__ == '__main__':
    app.run(debug=True)
