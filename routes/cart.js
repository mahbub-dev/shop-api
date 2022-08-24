const Cart = require("../models/Cart");
const User = require("../models/User");
const { verifyAdmin, verifyUser } = require("./verifyToken");
const router = require("express").Router();

//CREATE
router.post("/:id", verifyUser, async (req, res) => {
	try {
		const userId = req.params.id;
		let item = req.body.cartData;
		item.total_price = (item.quantity || 1) * item.price;
		// let productId;
		// item.productId ? (productId = item.productId) : (productId = item._id);
		let cart = await Cart.findOne({ userId });
		if (cart) {
			//cart exists for user
			let itemIndex = cart.products.findIndex(
				(p) => p.productId == item.productId
			);
			if (itemIndex > -1) {
				//product exists in the cart, update the quantity
				let productItem = cart.products[itemIndex];
				productItem.quantity = item.quantity;
				productItem.color = item.color;
				productItem.size = item.size;
				productItem.total_price = item.total_price;
				cart.products[itemIndex] = productItem;
			} else {
				//product does not exists in cart, add new item
				cart.products.push(item);
			}
			cart = await cart.save();
			return res.status(201).send(cart);
		} else {
			//no cart for user, create new cart
			const newCart = await Cart.create({
				userId,
				products: [
					{
						item,
					},
				],
			});

			return res.status(200).json(newCart);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json("Something went wrong");
	}
});

// //UPDATE
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
// 	try {
// 		const updatedCart = await Cart.findByIdAndUpdate(
// 			req.params.id,
// 			{
// 				$set: req.body,
// 			},
// 			{ new: true }
// 		);
// 		res.status(200).json(updatedCart);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// DELETE ONE
router.post("/:id", verifyUser, async (req, res) => {
	const { userId } = req.body;
	const { id } = req.params;
	try {
		let cart = await Cart.findOne({ userId });
		let itemIndex = cart.products.findIndex((p) => p.productId === id);

		if (itemIndex > -1) {
			//product exists in the cart, update the quantity
			const filterItem = cart.products.filter((i) => i.productId !== id);
			let productItem = cart.products[itemIndex];
			productItem = filterItem;
			cart.products = productItem;
		}
		cart = await cart.save();
		return res.status(200).json({
			msg: "sussesfuly deleted",
			cart,
		});
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

//GET USER CART
router.get("/find/:id", async (req, res) => {
	// console.log(req.params.id);
	try {
		const cart = await Cart.findOne({ userId: req.params.id });
		res.status(200).json(cart);
	} catch (err) {
		res.status(500).json(err);
	}
});

// //GET ALL

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		const carts = await Cart.find();
// 		res.status(200).json(carts);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

module.exports = router;
