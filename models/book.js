const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, require:true},
    author: {type: [String], require: true},
    description: {type:String, require: true},
    image: {type: String, required: true},
    link: {type:String, required: true},
    googleId: { type: String, required: true, unique: true }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
