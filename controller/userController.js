const User = require("../models/User");
const bcrypt = require("bcrypt");
const response = require("../utils");
const Order = require("../models/Order");

// UPDATE USER
const updateUser = async (req, res) => {
	try {
		let error = {};
		let success = {};
		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			{
				$set: req.body.update,
			},
			{ new: true }
		);
		updatedUser
			? (success.updatedUser = updatedUser)
			: (error.msg = "updating failed");
		response(error, success, res);
	} catch (err) {
		error.server = err;
		res.json({ error });
	}
};

//DELETE USER
const deleteUser = async (req, res) => {
	let success = {};
	let error = {};
	try {
		success = await User.findByIdAndDelete(req.user._id);
		deleteUser ? success : (error.msg = "deleting failed");
		response(error, success, res);
	} catch (err) {
		error.server = err;
		res.json(error);
	}
};

// LOGIN USER
const getLoginUser = async (req, res) => {
	try {
		let success = {};
		let error = {};
		const user = await User.findOne({ _id: req.user.id });
		if (user) {
			success = user;
			// create default order collection in db 
			let userOrder = await Order.findOne({ userId: req.user.id });
			if (!userOrder) {
				await Order.create({
					userId: req.user.id,
					orders: [],
				});
			}
		} else {
			error.msg = "user not found";
		}
		response(error, success, res);
	} catch (e) {
		console.log(e);
		error.server = e;
		res.status(500).json({ error });
	}
};

//GET ALL USER

const getALlUser = async (req, res) => {
	const query = req.query.new;
	try {
		const users = query
			? await User.find().sort({ _id: -1 }).limit(5)
			: await User.find();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

module.exports = {
	updateUser,
	deleteUser,
	getLoginUser,
	getALlUser,
};
