const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		orders: [
			{
				product: { type: Object },
				address: { type: Object },
				status: { type: String, default: "pending" },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
