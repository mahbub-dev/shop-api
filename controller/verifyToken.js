const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (authorization) {
			const token = authorization.split(" ")[1];
			jwt.verify(token, process.env.JWT_SEC, (err, user) => {
				if (err) {
					console.log(err);
					res.status(403).json("Token is not valid!");
				}
				req.user = user;
			});
			if (!req.user.isAdmin) {
				next();
			}
		} else {
			res.status(404).json("You are not a user!");
		}
	} catch (e) {
		next("authorization failed");
	}
};
const verifyAdmin = (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (authorization) {
			const token = authorization.split(" ")[1];
			jwt.verify(token, process.env.JWT_SEC, (err, user) => {
				if (err) {
					console.log(err);
					res.status(403).json("Token is not valid!");
				}
				req.user = user;
			});

			if (req.user.isAdmin) {
				console.log("admin authorized");
				next();
			}
		} else {
			return res.status(401).json("you are not an admin!");
		}
	} catch (e) {
		next("authorization failed");
	}
};

module.exports = {
	verifyUser,
	verifyAdmin,
	// verifyTokenAndAdmin,
};
