const router = require("express").Router();
const Coupon = require("../models/Coupon");
const response = require("../utils");
const { verifyUser } = require("../controller/verifyToken");
// coupon code
router.post("/", verifyUser, async (req, res) => {
	let error = {};
	let success = {};
	try {
		const userId = req.user.id;
		const email = req.body.email;

		// genarete coupon
		function coupongenerator() {
			var coupon = "";
			var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
			for (var i = 0; i < 10; i++) {
				coupon += possible.charAt(
					Math.floor(Math.random() * possible.length)
				);
			}
			return coupon;
		}
		const coupon = coupongenerator();
		const coupons = await Coupon.findOne({ userId });
		if (coupons) {
			if (coupons.coupon.email === email) {
				success = coupons;
			} else {
				error.msg = "invalid email";
			}
		} else {
			const newCoupon = new Coupon({
				userId: userId,
				coupon: {
					code: coupon,
					email,
				},
			});
			success = await newCoupon.save();
		}

		response(error, success, res);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

module.exports = router;
