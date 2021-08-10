const books = [{
    ISBN: "1234Books",
    title: "Telsa",
    pubDate: "2021-08-05",
    language: "en",
    numPage: "250",
    author: [1, 2],
    publication: [1].concat,
    category: ["tech", "space", "education"]

}]
const author = [{
        id: 1,
        name: "Harsh",
        book: ["12345Books", "secretBook", "SpecialBook"]
    },
    {
        id: 2,
        name: "Shubham",
        book: ["12345Books", "secretBook"]
    }
]

const publication = [{
    id: 1,
    name: "writex",
    books: ["1234Books"]
}, {
    id: 2,
    name: "writex23",
    books: []

}]

module.exports = { books, author, publication };