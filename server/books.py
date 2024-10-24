import sqlite3

#dict where keys are columns and values are rows
def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {fields[i]: row[i] for i in range(len(fields))}


class BooksDB:

    def __init__(self, filename):
        #create connection to database
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory

        #use the connection instance to perform db operations
        #create a cursor object for the connection
        self.cursor = self.connection.cursor()


    def getBooks(self):
        #now that we have an access point we can fetch all or one
        #ONLY applicable use of fetch is following a SELECT query
        self.cursor.execute("SELECT * FROM books")
        books = self.cursor.fetchall()  #this will fetch all rows and using fetchone will only return one row
        return books


    def getBook(self, book_id):
        #now that we have an access point we can fetch all or one
        #ONLY applicable use of fetch is following a SELECT query
        self.cursor.execute("SELECT * FROM books WHERE id = ?", (book_id,))
        book = self.cursor.fetchone()  #this will fetch all rows and using fetchone will only return one row
        return book


    def createBook(self, name, review, pages, author, isbn):
        #add a new book to our db
        self.cursor.execute("INSERT INTO books (name, review, pages, author, isbn) VALUES (?, ?, ?, ?, ?)",
                            (name, review, pages, author, isbn))
        self.connection.commit()   #this is like github you must commit your changes for it to work
    
    def putBook(self, book_id, name, review, pages, author, isbn):
        self.cursor.execute("UPDATE books SET name = ?, review = ?, pages = ?, author = ?, isbn = ? WHERE id = ?",
                            (name, review, pages, author, isbn, book_id))
        self.connection.commit()

    def deleteBook(self, book_id):
        self.cursor.execute("DELETE FROM books WHERE id = ?", (book_id,))
        self.connection.commit()




#HOW TO OPEN 
#sqlite3 books.py
#.tables to see your tables 
#SELECT * FROM books;
#INSERT INTO books (id, name, review, pages, color, author, isbn)
#DELETE FROM books WHERE id = ?