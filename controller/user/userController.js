const userService = require("./userService");
const { errorResponse } = require("../../utils");

// UPDATE USER
const updateUser = async (req, res) => {
	try {
		const serviceRes = await userService.update(req.body.update);
		res.status(201).json(serviceRes);
	} catch (err) {
		errorResponse(res, err);
	}
};

//DELETE USER
const deleteUser = async (req, res) => {
	try {
		const serviceRes = await userService.delete(req.user._id);
		res.status(200).json(serviceRes);
	} catch (err) {
		errorResponse(res, err);
	}
};

// LOGIN USER
const getLoginUser = async (req, res) => {
	try {
		const serviceRes = await userService.getLogin(req.user.id);
		res.status(200).json(serviceRes);
	} catch (e) {
		errorResponse(res, err);
	}
};

//GET ALL USER
const getALlUser = async (req, res) => {
	try {
		const query = req.query.new;
		const serviceRes = await userService(query);
		res.status(200).json(serviceRes);
	} catch (err) {
		errorResponse(res, err);
	}
};

module.exports = {
	updateUser,
	deleteUser,
	getLoginUser,
	getALlUser,
};
