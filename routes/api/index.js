const router = require("express").Router();
const googleBook = require("./books");

//Google Book Routes
router.use("/books", googleBook);

module.exports = router;
