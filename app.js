const express = require('express');
const { connectToDB, getDB } = require('./db');
const app = express();

//db connection
let db;

connectToDB((err) => {
  if (!err) {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running at port 'http://localhost:${PORT}' `);
    });
    db = getDB();
  }
});

//Fetching the json data
app.get('/books', (req, res, next) => {
  let books = [];
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .forEach((book) => {
      return books.push(book);
    })
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: `Couldn't fetch the documents` });
    });
});
