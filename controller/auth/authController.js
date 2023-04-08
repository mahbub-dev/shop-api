const { errorResponse } = require("../../utils");
const authService = require("./authService");
// register controller
const userSignup = async (req, res) => {
	try {
		const { phone, email, password, name } = req.body.user;
		// requested data send to service layer
		const serviceRes = await authService.signup({
			phone,
			email,
			password,
			name,
		});
		res.status(201).json(serviceRes);
	} catch (err) {
		errorResponse(res, err);
	}
};

// user login controller
const userLogin = async (req, res) => {
	try {
		const { username, password } = req.body.user;
		// requested data send to service layer
		const serviceRes = await authService.login({ username, password });
		res.status(200).json(serviceRes);
	} catch (err) {
		errorResponse(res, err);
	}
};

module.exports = { userSignup, userLogin,};
