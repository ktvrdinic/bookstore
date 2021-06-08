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
    } catch (err) {
      res.status(500).json({ err })
    }
  }

  async allBooksOfUser(req, res) {
    try {
      let allBook = await bookModel.find({ author: req.user._id });
      res.json({ books: allBook });
    } catch (err) {
      res.status(500).json({ err })
    }
  }

  async insertBook(req, res) {
    var { title, description, coverImg, price } = req.body.state;

    userModel.findOne({ _id: req.user._id }).then(async data => {
      var book1;
      if (data.name === "Darth" && data.surname === "Vader") return res.status(500).json({ err: 'That user is on black list' })
      else {
        book1 = await new bookModel({ title, description, author: req.user._id, coverImg, price });
        book1.save()
          .then(book => res.status(200).json({ success: true, book }))
          .catch(err => res.status(500).json({ err }))
      }
    }).catch(err => res.status(500).json({ err }));
  }

  async updateBook(req, res) {
    bookModel.findOneAndUpdate({ /*author: req.user._id,*/_id: req.body._id }, { $set: req.body })
      .then(data => res.json({ success: true, data }))
      .catch(err => res.status(500).json({ err }));
  }

  async deleteBook(req, res) {
    bookModel.deleteOne({ /*author: req.user._id,*/ _id: req.body._id })
      .then(data => res.json({ data }))
      .catch(err => res.status(500).json({ err }));
  }

  async unpublishBook(req, res) {
    bookModel.remove({ author: req.user._id, _id: req.body._id })
      .then(data => res.json({ data }))
      .catch(err => res.status(500).json({ err }));
  }
}

const bookController = new Book();

module.exports = bookController;