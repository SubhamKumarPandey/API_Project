const express = require("express");
//var bodyParser = require("body-parser");
var bodyParser = require("body-parser");

const booky = express();


const database = require("./database");
const { urlencoded } = require("express");
booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

// To get all the books:

/*
Route: "/"
Acess: PUBLIC
Parameter: NONE;
Method: GET
*/

booky.get("/", (req, res) => {
    return res.json({ books: database.books })
});

/*
Route: "/ib/:ibsn"
Acess: PUBLIC
Parameter: ibsn;
Method: GET
*/

//To get specified book Based on IBSN
booky.get("/ib/:isbn", (req, res) => {
    const getSpecifiedBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    )
    if (getSpecifiedBook.length === 0) {
        return res.json({ error: `No such book found with this ${req.params.isbn} reference` })
    }
    return res.json({ book: getSpecifiedBook })
});

/*
Route: "/c"
Acess: PUBLIC
Parameter: ibsn;
Method: GET
*/

//To get specified book Based on category
booky.get("/c/:category", (req, res) => {
    const getSpecifiedBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )
    if (getSpecifiedBook.length === 0) {
        return res.json(`No such book found with ${req.params.category} category`)
    }
    return res.json({ category: getSpecifiedBook })
});

/*
Route: "/lang"
Acess: PUBLIC
Parameter: ibsn;
Method: GET
*/

//To get specified book Based on language
booky.get("/lan/:language", (req, res) => {
    const getSpecifiedBook = database.books.filter(
        (book) => book.language === req.params.language
    )
    if (getSpecifiedBook.length === 0) {
        return res.json(`No such book found with lang. ${req.params.language}`)
    }
    return res.json({ language: getSpecifiedBook })
});

/*
Route: "/author"
Acess: PUBLIC
Parameter: NONE;
Method: GET
*/

//To get all authors
booky.get("/author", (req, res) => {
    return res.json({ Author: database.author })
});

/*
Route: "/author/id"
Acess: PUBLIC
Parameter: id;
Method: GET
*/

//To get author based on id
booky.get("/author/id/:id", (req, res) => {
    const getSpecifiedAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    )
    if (getSpecifiedAuthor.length === 0) {
        return res.json(`No such author found ${req.params.id}`)
    }
    return res.json({ Author: getSpecifiedAuthor })
});

/*
Route: "/author/book"
Acess: PUBLIC
Parameter: book;
Method: GET
*/

//To get author based on books
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecifiedAuthor = database.author.filter(
        (book) => book.book.includes(req.params.isbn)
    )
    if (getSpecifiedAuthor.length === 0) {
        return res.json(`No author found for the book of ${req.params.isbn} `)
    }
    return res.json({ Author: getSpecifiedAuthor })
})

/*
Route: "/pub"
Acess: PUBLIC
Parameter: NONE;
Method: GET
*/

//To get all publication
booky.get("/pub", (req, res) => {
    return res.json({ Publication: database.publication })
});

/*
Route: "/pub"
Acess: PUBLIC
Parameter:id ;
Method: GET
*/

//To specific publication based on id
booky.get("/pub/id/:id", (req, res) => {
    const getSpecifiedPublication = database.publication.filter(
        (pub) => pub.id === parseInt(req.params.id)
    )
    if (getSpecifiedPublication.length === 0) {
        return res.json(`No such publication with id ${req.params.id} found`)
    }
    return res.json({ Publication: getSpecifiedPublication })
});

/*
Route: "/pub/book"
Acess: PUBLIC
Parameter:ISBN ;
Method: GET
*/

//To specific publication based on book
booky.get("/pub/book/:isbn", (req, res) => {
    const getSpecifiedPublication = database.publication.filter(
        (pub) => pub.books.includes(req.params.isbn)
    )
    if (getSpecifiedPublication.length === 0) {
        return res.json(`No such book found with name ${req.params.isbn}`)
    }
    return res.json({ Publication: getSpecifiedPublication })
});

/*
Route: "/book/new"
Acess: PUBLIC
Parameter:NONE ;
Method: POST
*/
booky.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({ updatedBooks: database.books });
});
/*
Route: "/author/new"
Acess: PUBLIC
Parameter:NONE ;
Method: POST
*/
booky.post("/author/new", (req, res) => {
    const newauthor = req.body;
    database.author.push(newauthor);
    return res.json(database.author);
});
/*
Route: "/publication/new"
Acess: PUBLIC
Parameter:NONE ;
Method: POST
*/

booky.post("/publication/new", (req, res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json(database.publication);
});


/*
Route            /publication/update/book
Description      Update /add new publication
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/publication/update/book/:isbn", (req, res) => {
    //Update the publication database
    database.publication.forEach((pub) => {
        if (pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn);
        }
    });
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });
    return res.json({
        books: database.books,
        publications: database.publication,
        message: "Successfully updated publications"
    });
});

/****DELETE*****/
/*
Route            /book/delete
Description      Delete a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
*/

booky.delete("/book/delete/:isbn", (req, res) => {
    //Whichever book that doesnot match with the isbn , just send it to an updatedBookDatabase array
    //and rest will be filtered out

    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updatedBookDatabase;

    return res.json({ books: database.books });
});

/*
Route            /book/delete/author
Description      Delete an author from a book and vice versa
Access           PUBLIC
Parameter        isbn, authorId
Methods          DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    //Update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });


    //Update the author database
    database.author.forEach((eachAuthor) => {
        if (eachAuthor.id === parseInt(req.params.authorId)) {
            const newBookList = eachAuthor.books.filter(
                (book) => book !== req.params.isbn
            );
            eachAuthor.books = newBookList;
            return;
        }
    });

    return res.json({
        book: database.books,
        author: database.author,
        message: "Author was deleted!!!!"
    });
});



booky.listen(3000, () => {
    console.log("Server is up n running")
});