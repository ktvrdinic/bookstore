const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        maxlength: 32,
    },
    email: {
        type: String,
        required: true,
        index: { unique: true },
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        default: "user.png",
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;