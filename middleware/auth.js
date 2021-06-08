const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

exports.loginCheck = (req, res, next) => {
  try {
    let token, headerToken;
    token = req.cookies.token.replace("Bearer ", "");
    headerToken = req.headers.authorization.replace("Bearer ", "");

    if(token !== headerToken) {
      res.redirect('/login');
      throw new Error('Something is wrong with token');
    }

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