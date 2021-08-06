const express =require("express");

const booky =express();

const database= require("./database")

// To get all the books:

/* 
Route: "/"
Acess: PUBLIC
Parameter: NONE;
Method: GET
*/

booky.get("/",(req,res)=>{
    return res.json({books: database.books})
});

/* 
Route: "/ib/:ibsn"
Acess: PUBLIC
Parameter: ibsn;
Method: GET
*/

//To get specified book Based on IBSN
booky.get("/ib/:isbn", (req,res)=>{
    const getSpecifiedBook= database.books.filter(
        (book)=> book.ISBN===req.params.isbn
    )
    if(getSpecifiedBook.length===0){
        return res.json({error: `No such book found with this ${req.params.isbn} reference`})
    }
    return res.json({book:getSpecifiedBook})
});

/* 
Route: "/c"
Acess: PUBLIC
Parameter: ibsn;
Method: GET
*/

//To get specified book Based on category
booky.get("/c/:category",(req,res)=>{
    const getSpecifiedBook= database.books.filter(
        (book)=> book.category.includes(req.params.category)
    )
    if(getSpecifiedBook.length===0){
        return res.json(`No such book found with ${req.params.category} category`)
    }
    return res.json({category: getSpecifiedBook})
});

/* 
Route: "/lang"
Acess: PUBLIC
Parameter: ibsn;
Method: GET
*/

//To get specified book Based on language
booky.get("/lan/:language", (req,res)=>{
    const getSpecifiedBook= database.books.filter(
        (book)=> book.language=== req.params.language
    )
    if(getSpecifiedBook.length===0){
        return res.json(`No such book found with lang. ${req.params.language}`)
    }
    return res.json({language: getSpecifiedBook})
});

/* 
Route: "/author"
Acess: PUBLIC
Parameter: NONE;
Method: GET
*/

//To get all authors
booky.get("/author",(req,res)=>{
    return res.json({Author: database.author})
});

/* 
Route: "/author/id"
Acess: PUBLIC
Parameter: id;
Method: GET
*/

//To get author based on id
booky.get("/author/id/:id", (req,res)=>{
    const getSpecifiedAuthor= database.author.filter(
    (author) => author.id===parseInt( req.params.id)
    )
    if(getSpecifiedAuthor.length===0){
        return res.json(`No such author found ${req.params.id}`)
    }
    return res.json({Author: getSpecifiedAuthor})
});

/* 
Route: "/author/book"
Acess: PUBLIC
Parameter: book;
Method: GET
*/

//To get author based on books
booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecifiedAuthor = database.author.filter(
        (book)=>book.book.includes(req.params.isbn)
    )
    if(getSpecifiedAuthor.length===0){
        return res.json(`No author found for the book of ${req.params.isbn} `)
    }
    return res.json({Author: getSpecifiedAuthor})
})

/* 
Route: "/pub"
Acess: PUBLIC
Parameter: NONE;
Method: GET
*/

//To get all publication
booky.get("/pub",(req,res)=>{
    return res.json({Publication: database.publication})
});

/* 
Route: "/pub"
Acess: PUBLIC
Parameter:id ;
Method: GET
*/

//To specific publication based on id
booky.get("/pub/id/:id", (req, res)=>{
    const getSpecifiedPublication = database.publication.filter(
        (pub)=> pub.id=== parseInt(req.params.id) 
    )
    if(getSpecifiedPublication.length===0){
        return res.json(`No such publication with id ${req.params.id} found`)
    }
    return res.json({Publication:getSpecifiedPublication})
});

/* 
Route: "/pub/book"
Acess: PUBLIC
Parameter:ISBN ;
Method: GET
*/

//To specific publication based on book
booky.get("/pub/book/:isbn", (req,res)=>{
    const getSpecifiedPublication= database.publication.filter(
        (pub)=>pub.books.includes(req.params.isbn)
    )
    if(getSpecifiedPublication.length===0){
        return res.json(`No such book found with name ${req.params.isbn}`)
    }
    return res.json({Publication:getSpecifiedPublication})
});


booky.listen(3000,()=>{
    console.log("Server is up n running")
});