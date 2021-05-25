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
      console.log(err);
      res.status(404);
    }
  }

  async allBooksOfUser(req, res) {
    try {
      let allBook = await bookModel.find({author: req.user._id});
      res.json({ books: allBook });
    } catch (err) {
      console.log(err);
      res.status(404);
    }
  }

  async insertBook(req, res) {
    try {
      var { title, description, coverImg, price } = req.body.state;
      console.log(`Title ${title} description ${description} coverImg ${coverImg} price ${price}`);
      var book1 = await new bookModel({ title, description, author: req.user._id, coverImg, price });

      userModel.findOne({ _id: req.user._id }).then(data => {
        if (data.name === "Darth" && data.surname === "Vader") {
          res.status(404);
        } else {
          book1.save((err, book) => {
            if (err) {
              console.error(err);
              res.status(404).json({ err })
            }
            res.status(200).json({ success: true, book: book });
          })
        }
      }).catch(err => {
        console.log(err);
        res.status(404).json({ err })
      });

    } catch (err) {
      console.log(err);
      res.status(404).json({ err })
    }
  }

  async updateBook(req, res) {
    
    bookModel.findOneAndUpdate({ /*author: req.user._id,*/_id: req.body._id }, { $set: req.body })
      .then(doc => {
        res.json({ success: true, data: doc });
      })
      .catch(err => {
        console.log(err);
        res.json({ err });
      });
  }

  async deleteBook(req, res) {
    // console.log(`User ${req.user._id}, body ${req.body._id}`);
    try {
      bookModel.deleteOne({ /*author: req.user._id,*/ _id: req.body._id })
      .then(data => { res.json({ data }) });
    } catch (err) {
      console.log(err);
      res.status(404);
    }
  }

  async unpublishBook(req, res) {
    try {
      bookModel.remove({ author: req.user._id, _id: req.body._id }).then(data => { res.json({ data }) }).catch(err => { res.json({ err }) });
    } catch (err) {
      console.log(err);
      res.status(404);
    }
  }
}

const bookController = new Book();

module.exports = bookController;