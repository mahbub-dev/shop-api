const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			unique: true,
			required: true,
		},
		orders: { type: Array, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
