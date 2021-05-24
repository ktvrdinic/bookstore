const bookModel = require("../models/book");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/keys");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

class Book {
  async allBooks(req, res) {
    try {
      let allBook = await bookModel.find({});
      res.json({ books: allBook });
    } catch {
      res.status(404);
    }
  }

  async insertBook(req, res) {
    try {
      var { title, description, coverImg, price } = req.body;
      var book1 = await new bookModel({ title, description, author: req.user._id, coverImg, price });

      userModel.findOne({ _id: req.user._id }).then(data => {
        if (data.name === "Darth" && data.surname === "Vader") {
          res.status(404);
        } else {
          book1.save((err, book) => {
            if (err) return console.error(err);
            res.json({ success: true, book: book });
          })
        }
      }).catch(err => {
        console.log(err);
        res.status(404);
      });

    } catch (err) {
      console.log(err);
      res.status(404);
    }
  }

  async updateBook(req, res) {
    bookModel.findOneAndUpdate({ author: req.user._id, _id: req.body._id }, { $set: req.body })
      .then(doc => {
        res.json({ success: true, data: doc });
      })
      .catch(err => {
        console.log(err);
        res.json({ err });
      });
  }

  async deleteBook(req, res) {
    try {
      bookModel.remove({ author: req.user._id, _id: req.body._id }).then(data => { res.json({ data }) }).catch(err => { res.json({ err }) });
    } catch {
      res.status(404);
    }
  }

  async unpublishBook(req, res) {
    try {
      bookModel.remove({ author: req.user._id, _id: req.body._id }).then(data => { res.json({ data }) }).catch(err => { res.json({ err }) });
    } catch {
      res.status(404);
    }
  }
}

const bookController = new Book();

module.exports = bookController;