const mongoose = require("mongoose");
const CouponsSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		coupon: {
			code: { type: String, required: true, unique: true },
			email: { type: String, required: true },
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Coupons", CouponsSchema);
