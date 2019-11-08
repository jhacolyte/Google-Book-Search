const router = require("express").Router();
const bookController = require("../../controller/bookController");

//Match with "/api/books"
router.route("/")
.get(bookController.findAll)
.post(bookController.create);

//Match With "/api/books/:id"

router.route("/:id")
    .delete(bookController.remove);
//     .get(bookController.findById)
//     .put(bookController.update)



module.exports = router;
