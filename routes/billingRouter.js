const router = require("express").Router();
const {
	AddBilling,
	UpdateBilling,
	DeleteBilling,
	GetBilling,
} = require("../controller/billingController");
const { verifyAdmin, verifyUser } = require("../controller/verifyToken");
//Add or update shiping address
// create billing
router.post("/", verifyUser, AddBilling);
// update billing
router.put("/:billingId", verifyUser, UpdateBilling);
//delete billing
router.delete("/:billingId", verifyUser, DeleteBilling);
//get billing
router.get("/", verifyUser, GetBilling);

module.exports = router;
