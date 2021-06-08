const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { loginCheck } = require("./middleware/auth");
const bookController = require("./controllers/book");
// const { loginCheck } = require("./middleware/auth");

// Import Router
const authRouter = require("./routes/auth");
const bookRouter = require("./routes/book");

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const app = express();
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

// Connect to mongoDB
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(process.env.DATABASE, connectionOptions)
  .then(result => app.listen(port, () => console.log(`App listening on port ${port}!`)))
  .catch(err => console.log(err));

// api routes
app.use('/api', authRouter);
app.use('/booksapi', bookRouter);
app.get('/books', (req, res) => { bookController.allBooks(req, res) });
app.get('/profile', loginCheck, (req, res) => { bookController.allBooksOfUser(req, res) });