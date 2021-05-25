const { toTitleCase, validateEmail } = require("../_helpers/function");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/keys");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

//   async allUser(req, res) {
//     try {
//       let allUser = await userModel.find({});
//       res.json({ users: allUser });
//     } catch {
//       res.status(404);
//     }
//   }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    console.log('Sign up', req.body);
    let { name, email, surname, password, cpassword } = req.body;
    let error = {name: '', email: '', surname: '', password: ''};
    if (!name || !email || !password || !surname) {
      error = {
        ...error,
        name: name ? '' : "Filed must not be empty",
        email: email ? '' : "Filed must not be empty",
        surname: surname ? '' : "Filed must not be empty",
        password: password ? '' : "Filed must not be empty",
        cpassword: cpassword ? '' : "Filed must not be empty",
      };
      return res.json({ error, level: '1' });
    }else if(password !== cpassword){
      error = {
        ...error,
        password: "Password doesn't match",
      };
      return res.json({ error, level: '2' });
    }
    else if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.json({ error, level: '3' });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            surname: "",
            email: "",
          };
          return res.json({ error, level: '4' });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                surname: "",
                email: "Email already exists",
              };
              return res.json({ error, level: '5' });
            } else {
              let newUser = new userModel({
                name,
                email,
                surname,
                password,
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Account create successfully. Please login",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          surname: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    console.log('Login', req.body);
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          let expiration = '1d';
          const token = jwt.sign(
            { _id: data._id, name: data.name },
            process.env.SECRET,
            { expiresIn: expiration }
          );
          const encode = jwt.verify(token, process.env.SECRET);
          await res.cookie('token', token, {
            expires: new Date(Date.now() + expiration),
            secure: false, // set to true if your using https
            httpOnly: false,
          });
          return res.json({
            success: {
              token: token,
              user: encode,
            }
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();

module.exports = authController;