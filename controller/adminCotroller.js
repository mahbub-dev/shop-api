const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const response = require("../utils");

// UPDATE Admin
const updateAdmin = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const updatedAdmin = await Admin.findByIdAndUpdate(
			req.user._id,
			{
				$set: req.body.update,
			},
			{ new: true }
		);
		updatedAdmin
			? (success.updatedAdmin = updatedAdmin)
			: (error.msg = "updating failed");
		response(error, success, res);
	} catch (err) {
		error.server = err;
		res.json({ error });
	}
};

//DELETE USER
const deleteAdmin = async (req, res) => {
	let success = {};
	let error = {};
	try {
		success = await Admin.findByIdAndDelete(req.user._id);
		deleteAdmin ? success : (error.msg = "deleting failed");
		response(error, success, res);
	} catch (err) {
		error.server = err;
		res.json(error);
	}
};

// LOGIN ADMIN
const getLoginAdmin = async (req, res) => {
	try {
		let success = {};
		let error = {};
		const admin = await Admin.findOne({ _id: req.user.id });
		if (admin) {
			success = admin;
		} else {
			error.msg = "Admin not found";
		}
		response(error, success, res);
	} catch (e) {
		console.log(e);
		error.server = e;
		res.status(500).json({ error });
	}
};

//GET ALL USER

const getALlAdmin = async (req, res) => {
	const query = req.query.new;
	try {
		const users = query
			? await Admin.find().sort({ _id: -1 }).limit(5)
			: await Admin.find();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

module.exports = {
	updateAdmin,
	deleteAdmin,
	getLoginAdmin,
	getALlAdmin,
};
