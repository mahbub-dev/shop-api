const response = (error, success, res) => {
	Object.keys(error).length > 0 ? res.json({ error }) : res.json({ success });
};

// create custome instacne
class customError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

// create error
createError = (message, status = "undefined") => {
	throw new customError(message, status);
};

// create error respose
const errorResponse = (res, error) => {
	if (error instanceof customError) {
		const { message, status } = error;
		res.status(status).json({ message, status });
	} else {
		console.log(error);
		res.status(500).json("internel server error");
	}
};
module.exports = { createError, errorResponse };
