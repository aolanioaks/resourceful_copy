#server.py
from flask import Flask, request, json
from books import BooksDB


app = Flask(__name__)

# BOOKS = [                        
#     "The Housemaid",
#     "Ugly Love",
#     "Verity"
# ]


@app.route("/books", methods=["OPTIONS"])
@app.route("/books/<int:book_id>", methods=["OPTIONS"])
def options_book(book_id=None):
    return '', 204, {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PUT,DELETE,GET,POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                    }



@app.route("/books", methods=["GET"])
def retrieve_books():
    db = BooksDB("books_db.db")
    return db.getBooks(), {"Access-Control-Allow-Origin" : "*"}


@app.route("/books", methods=["GET"])
def list_books():
    db = BooksDB("books_db.db")
    books = db.getBooks() 
    books_json = json.dumps(books) 
    return books_json, 200, {'Content-Type': 'application/json'}



@app.route("/books", methods=["POST"])
def create_book():
    name = request.form.get("name", "")
    review = request.form.get("review", "")
    pages = request.form.get("pages", 0)
    author = request.form.get("author", "")
    isbn = request.form.get("isbn", "")
    
    db = BooksDB("books_db.db")
    # Pass individual arguments to createBook, not a dictionary
    db.createBook(name, review, pages, author, isbn)
    return "Created", 201, {"Access-Control-Allow-Origin": "*"}
    


@app.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    db = BooksDB("books_db.db")
    if db.getBook(book_id):
        db.deleteBook(book_id)
        return "Deleted", 204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, OPTIONS"
        }
    else:
        return "Not found", 404, {"Access-Control-Allow-Origin": "*"}
    

@app.route("/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    print("update book with ID ", book_id)
    db = BooksDB("books_db.db")
    bk = db.getBook(book_id)

    if bk:
        name = request.form.get("name", "")
        review = request.form.get("review", "")
        pages = request.form.get("pages", 0)
        author = request.form.get("author", "")
        isbn = request.form.get("isbn", "")
        db.putBook(book_id, name, review, pages, author, isbn)
        return "Updated", 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return f"Book with {book_id} not found", 404, {"Access-Control-Allow-Origin": "*"}



def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()


