const Order = require("../models/Order");
const { verifyAdmin, verifyUser } = require("../controller/verifyToken");
const { createOrder, getOrder } = require("../controller/order/orderController");

const router = require("express").Router();

//CREATE
router.post("/:id", verifyUser, createOrder);

//UPDATE
router.put("/:id", verifyAdmin, async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE
router.delete("/:id", verifyAdmin, async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json("Order has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET USER ORDERS
router.get("/", verifyUser, getOrder);

// //GET ALL

router.get("/", verifyAdmin, async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET MONTHLY INCOME

router.get("/income", verifyAdmin, async (req, res) => {
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(
		new Date().setMonth(lastMonth.getMonth() - 1)
	);

	try {
		const income = await Order.aggregate([
			{ $match: { createdAt: { $gte: previousMonth } } },
			{
				$project: {
					month: { $month: "$createdAt" },
					sales: "$amount",
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: "$sales" },
				},
			},
		]);
		res.status(200).json(income);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
