const Order = require("../../models/Order");
const User = require("../../models/User");
const { createError } = require("../../utils");

// module scaffholding
const userDB = {};

// update user
userDB.update = async (data) => {
	try {
		return await User.findByIdAndUpdate(
			req.user._id,
			{
				$set: data,
			},
			{ new: true }
		);
	} catch (error) {
		throw error;
	}
};

//delete user
userDB.delete = async (id) => {
	try {
		const res = await User.findByIdAndDelete(req.user._id);
		if (res) {
			return res;
		} else {
			createError("something went wrong", 400);
		}
	} catch (error) {
		throw error;
	}
};

// get login user
userDB.getLogin = async (_id) => {
	try {
		const user = await User.findOne({ _id });
		// create default order collection in db
		if (user) {
			let userOrder = await Order.findOne({ userId: req.user.id });
			if (!userOrder) {
				await Order.create({
					userId: req.user.id,
					orders: [],
				});
			}
			return user;
		} else {
			createError("user not found", 404);
		}
	} catch (error) {
		throw error;
	}
};

// get all user
userDB.getAll = async (query) => {
	try {
		const users = query
			? await User.find().sort({ _id: -1 }).limit(5)
			: await User.find();
		return users;
	} catch (error) {
		throw error;
	}
};
module.exports = userDB;
