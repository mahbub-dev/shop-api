const { verifyUser, verifyAdmin } = require("../controller/verifyToken");
const router = require("express").Router();
const {
	updateAdmin,
	deleteAdmin,
	getLoginAdmin,
	getALlAdmin,
} = require("../controller/adminCotroller");

//UPDATE
router.put("/", verifyAdmin, updateAdmin);
//DELETE
router.delete("/", verifyAdmin, deleteAdmin);
//GET USER
router.get("/", verifyAdmin, getLoginAdmin);
//GET ALL USER BY ADMIN
router.get("/all", verifyAdmin, getALlAdmin);

module.exports = router;
