from flask import Flask
from Backend.DB.couchbase_connection import getWorkingCollection

app = Flask(__name__)

@app.route('/')
def home():
    users_collection = getWorkingCollection("user-data","users")
    content = users_collection.get("test_user155465458")
    return f"{content.content_as[dict]}"

if __name__ == '__main__':
    app.run(debug=True)
