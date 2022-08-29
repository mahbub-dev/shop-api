const { verifyUser } = require("../controller/verifyToken");
const {
	createCart,
	deleteCart,
	getCart,
} = require("../controller/cartController");
const router = require("express").Router();

//CREATE
router.post("/:id", verifyUser, createCart);

// DELETE ONE
router.delete("/:id", verifyUser, deleteCart);

//GET USER CART
router.get("/", verifyUser, getCart);
module.exports = router;
