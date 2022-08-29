const { verifyUser, verifyAdmin } = require("../controller/verifyToken");
const router = require("express").Router();
const {
	updateUser,
	deleteUser,
	getLoginUser,
	getALlUser,
} = require("../controller/userController");

//UPDATE
router.put("/", verifyUser, updateUser);
//DELETE
router.delete("/", verifyUser, deleteUser);
//GET USER
router.get("/", verifyUser, getLoginUser);
//GET ALL USER By ADMIN
router.get("/all", verifyAdmin, getALlUser);

module.exports = router;
