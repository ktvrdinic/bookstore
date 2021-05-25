const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

exports.loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    console.log('Auth check req ', JSON.stringify(req.cookie));
    console.log('Auth check res ', JSON.stringify(res.headers));
    token = token.replace("Bearer ", "");
    decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).send({ error: "You must be logged in" });
  }
};

// exports.isAuth = (req, res, next) => {
//   let { loggedInUserId } = req.body;
//   if (
//     !loggedInUserId ||
//     !req.user._id ||
//     loggedInUserId != req.user._id
//   ) {
//     res.status(403).json({ error: "You are not authenticate" });
//   }
//   next();
// };