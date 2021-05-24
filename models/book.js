const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    coverImg: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: "user.png",
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;