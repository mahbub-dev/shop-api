const { verifyAdmin, verifyUser } = require("../controller/verifyToken");
const router = require("express").Router();
const {
	createPrdouct,
	updateProduct,
	deleteProduct,
	getAllProduct,
	getSearchProduct,
	getProduct,
	
} = require("../controller/product/productController");

//CREATE
router.post("/", verifyAdmin, createPrdouct);

//UPDATE
router.put("/:id", verifyAdmin, updateProduct);

//DELETE
router.delete("/:id", verifyAdmin, deleteProduct);

//GET PRODUCT
router.get("/:id", getProduct);

//GET ALL PRODUCTS
router.get("/", getAllProduct);

//GET SEAERCH PRODUCTS
router.get("/search/:keyword", getSearchProduct);

module.exports = router;
