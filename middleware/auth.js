const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

exports.loginCheck = (req, res, next) => {
  try {
    let token = req.cookies.token;
    // console.log('Auth check req ', JSON.stringify(req.cookies.token));
    token = token.replace("Bearer ", "");

    // if(token !== req.headers['token']) {
    //   res.redirect('/login');
    //   throw new Error('Something wrong with token');
    // }
    
    decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    res.redirect('/login');
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