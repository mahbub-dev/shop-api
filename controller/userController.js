const User = require("../models/User");
// update user billing
const updateBilling = async (req, res) => {
	try {
		const id = req.params.id;
		const { billing } = req.body;
		let success = {};
		let error = {};
		let user = await User.findOne({ _id: id });
		if (user) {
			let itemIndex = user.billing.findIndex(
				(item) => item._id == billing._id
			);
			if (itemIndex > -1) {
				user.billing[itemIndex] = billing;
				success.updateBilling = await user.save();
				success.msg = "updated";
				res.json(success);
            }
            else {
                error.msg = 'billing not found'
            }
		} else {
			error.msg = "user not found";
            res.json({ error })
		}
	} catch (err) {
        console.log(err);
	}
};

//add user billing
const addBilling = async (req, res) => {
	try {
		const id = req.params.id;
		const { billing } = req.body;
		let user = await User.findOne({ _id: id });
		user.billing.push(billing);
		if (!user.billing) {
			let itemIndex = user.billing.findIndex((item) => item._id === id);
			if (itemIndex > -1) {
				user.billing[itemIndex] = billing;
			}
		}
		const newUser = await user.save();
		res.json(newUser);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { updateBilling, addBilling };
