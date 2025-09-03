const express = require('express');
const { connectToDB, getDB } = require('./db');
const { ObjectId } = require('mongodb');
const app = express();
app.use(express.json());

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

app.get('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) => {
        res.status(500).json({ error: `Couldn't fetch the document` });
      });
  } else {
    res.status(500).json({ error: 'Not a valid doc id' });
  }
});

//Handling post request
app.post('/books', (req, res) => {
  const book = req.body;

  db.collection('books')
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: `Couldn't create a new document` });
    });
});
