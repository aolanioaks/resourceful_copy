console.log("connected");

let bookReviewWrapper = document.querySelector("section");
let toggleReviewsButton = document.getElementById("toggle-reviews-button");
let selectedBookId = null; 


function addBookReview(book) {
    // Create HTML elements for the book name, review, pages, author, isbn
    let bookDiv = document.createElement("div");
    let bookName = document.createElement("h3");
    let bookReview = document.createElement("p");
    let bookPages = document.createElement("p");
    let bookAuthor = document.createElement("p");
    let bookIsbn = document.createElement("p");
    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");

    bookName.textContent = book.name;                               //setting the text content of the elements
    bookReview.textContent = book.review;
    bookPages.textContent = book.pages;
    bookAuthor.textContent = book.author;
    bookIsbn.textContent = book.isbn;

    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteBook(book.id);
    editButton.textContent = "Edit";
    editButton.onclick = () => fillFormForEdit(book);

    
    // Append the book name, review, pages, author, ISBN to the wrapper section
    bookDiv.appendChild(bookName);
    bookDiv.appendChild(bookReview);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookIsbn);
    bookDiv.appendChild(editButton);
    bookDiv.appendChild(deleteButton);
    bookReviewWrapper.appendChild(bookDiv);

}

function loadBooksFromServer() {
    fetch("http://127.0.0.1:8080/books")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data); 
            bookReviewWrapper.textContent = ""; 
            data.forEach(addBookReview); 
        });
}

let addReviewButton = document.querySelector("#add-review-button");
addReviewButton.onclick = function addNewReview() { 
    console.log("button clicked");
    let inputBookName = document.querySelector("#input-book-name");
    let inputBookReview = document.querySelector("#input-book-review");
    let inputBookPages = document.querySelector("#input-book-pages");
    let inputBookAuthor = document.querySelector("#input-book-author");
    let inputBookIsbn = document.querySelector("#input-book-isbn");

    // Prepare data to send to server
    let data = "name=" + encodeURIComponent(inputBookName.value);
    data += "&review=" + encodeURIComponent(inputBookReview.value);
    data += "&pages=" + encodeURIComponent(inputBookPages.value);
    data += "&author=" + encodeURIComponent(inputBookAuthor.value);
    data += "&isbn=" + encodeURIComponent(inputBookIsbn.value)


    // Send new review to the server POST
    fetch("http://127.0.0.1:8080/books", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {
        console.log("New review created!", response);
        loadBooksFromServer();                         
    });
};

                                                
function deleteBook(bookId) {
    if (confirm("Are you sure you want to delete this book?")){
    fetch(`http://127.0.0.1:8080/books/${bookId}`, {
        method: "DELETE"
    }).then(response => {
        console.log("Book deleted!", response);
        loadBooksFromServer();                       
        });
    }
}


function fillFormEdit(book) {                                
    console.log("book id: ", book.id);
    document.querySelector("#input-book-name").value = book.name;
    document.querySelector("#input-book-review").value = book.review;
    document.querySelector("#input-book-pages").value = book.pages;
    document.querySelector("#input-book-author").value = book.author;
    document.querySelector("#input-book-isbn").value = book.isbn;
    selectedBookId = book.id;                                                       // Set the selectedBookId to the book being edited


    document.getElementById("add-review-button").style.display = "none";            //hide the add button
    document.getElementById("update-review-button").style.display = "inline-block"; //Show the update button 
}



document.getElementById("update-review-button").onclick = function updateBookReview() { // this function will update the book form.
    console.log("Updated button clicked!");
    if (selectedBookId !== null) {
        let inputBookName = document.querySelector("#input-book-name");
        let inputBookReview = document.querySelector("#input-book-review");
        let inputBookPages = document.querySelector("#input-book-pages");
        let inputBookAuthor = document.querySelector("#input-book-author");
        let inputBookIsbn = document.querySelector("#input-book-isbn");

        // Prepare data to send to server
        let data = "name=" + encodeURIComponent(inputBookName.value);
        data += "&review=" + encodeURIComponent(inputBookReview.value);
        data += "&pages=" + encodeURIComponent(inputBookPages.value);
        data += "&author=" + encodeURIComponent(inputBookAuthor.value);
        data += "&isbn=" + encodeURIComponent(inputBookIsbn.value);

        console.log("data was sent", data);


        // Send the updated book review to the server PUT
        fetch(`http://127.0.0.1:8080/books/${selectedBookId}`, { 
            method: "PUT",
            body: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            console.log("Book updated!", response);
            loadBooksFromServer();
            resetForm();
        });
        
    };
}

// This function will be reseting the form and will
// switch buttons after an update.
function resetForm() {
    document.querySelector("#input-book-name").value = "";
    document.querySelector("#input-book-review").value = "";
    document.querySelector("#input-book-pages").value = "";
    document.querySelector("#input-book-author").value = "";
    document.querySelector("#input-book-isbn").value = "";
    selectedBookId = null;                                                              // Reset the selected book ID

    document.getElementById("add-review-button").style.display = "inline-block";       // Show the "Add" button
    document.getElementById("update-review-button").style.display = "none";            // hide the update button
}

loadBooksFromServer();

toggleReviewsButton.addEventListener("click", function() {
    if (bookReviewWrapper.style.display === "none" || !bookReviewWrapper.style.display) {
        bookReviewWrapper.style.display = "block";
        loadBooksFromServer();
        toggleReviewsButton.textContent = "Hide Previous Reviews";
    } else {
        bookReviewWrapper.style.display = "none";
        toggleReviewsButton.textContent = "Show Previous Reviews";
    }
});

bookReviewWrapper.style.display = "none";