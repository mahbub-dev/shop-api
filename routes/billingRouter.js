const router = require("express").Router();
const {
	AddBilling,
	UpdateBilling,
	DeleteBilling,
	GetBilling,
} = require("../controller/billingController");
const {verifyAdmin,verifyUser} = require('../routes/verifyToken')
//Add or update shiping address
// create billing
router.post("/:userId", verifyUser,AddBilling);
// update billing
router.put("/:userId",verifyUser, UpdateBilling);
//delete billing
router.post("/delete/:userId",verifyUser, DeleteBilling);
//get billing
router.get("/:userId",verifyUser, GetBilling);

module.exports = router;
