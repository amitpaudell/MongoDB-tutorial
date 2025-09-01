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
