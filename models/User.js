const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		img: {
			type: String,
			default:
				"https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png",
		},
		isAdmin: { type: Boolean, default: false },
		default_billing: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Billing",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
