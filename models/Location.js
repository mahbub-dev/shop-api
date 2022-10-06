const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
	{
		visitors: {
			ip: {
				type: String,
				unique: true,
				required: true,
			},
			lat: { type: String, required: true },
			long: { type: String, required: true },
			time: { type: String },
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Location", LocationSchema);
