from flask import Flask
from DB.milvus_connection import make_connection
from DB.couchbase_connection import connect_to_couchbase, get_collection,get_scope
from Services.embedding import load_bert, get_word_vector
from .Routes.authRoutes import auth_bp
from .Routes.vectorRoutes import vector_bp
from .Routes.messageRoutes import message_bp
from .Routes.eventRoutes import event_bp

app = Flask(__name__)

# Register each blueprint
app.register_blueprint(auth_bp)
app.register_blueprint(vector_bp)
app.register_blueprint(message_bp)
app.register_blueprint(event_bp)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/')
def home():
    #vectorDB = make_connection()
    #couchbaseDB = connect_to_couchbase()
    tokenizer, model = load_bert()


if __name__ == '__main__':
    app.run(debug=True)
