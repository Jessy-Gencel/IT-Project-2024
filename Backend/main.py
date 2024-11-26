from flask import Flask
from Services.embedding import load_bert, get_word_vector,insert_vectors,format_vector_for_milvus
from Routes.authRoutes import auth_bp
from Routes.vectorRoutes import vector_bp
from Routes.messageRoutes import message_bp
from Routes.eventRoutes import event_bp

app = Flask(__name__)

app.register_blueprint(auth_bp)
app.register_blueprint(vector_bp)
app.register_blueprint(message_bp)
app.register_blueprint(event_bp)
@app.route('/')
def home():
    tokenizer, model = load_bert()
    word = "sleeping"
    vector = format_vector_for_milvus(get_word_vector(tokenizer,model,word))
    print(vector)
    #res = insert_vectors(global_vector_DB,"secondary_user_vectors",{"primary_key":1,"game_vector":vector,"music_vector":vector,"movie_vector":vector,"book_vector":vector})
    #res2 = insert_vectors(category_vector_DB,"secondary_vectors",{"primary_key":1,"game_vector":vector,"music_vector":vector,"book_vector":vector,"movie_vector":vector})
    return "yay"


if __name__ == '__main__':
    app.run(debug=True)
