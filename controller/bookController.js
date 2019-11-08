const db = require("../models");

//Defining methods for the controller
module.exports = {
    findAll: function(req,res){
        console.log("book find all function called");
        db.Book.find({})
        .then(dbBook => res.json(dbBook))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res){
        console.log(req.body);
        db.Book.create(req.body)
        .then(dbBook => res.json(dbBook))
        .catch(err=> res.status(422).json(err));
    },
    remove: function(req, res){
        console.log(req.params.id);
        db.Book.findById(req.params.id)
        .then(dbBook => dbBook.remove())
        .then(dbBook => res.json(dbBook))
        .catch(err => res.status(422).json(err));
    }
}
