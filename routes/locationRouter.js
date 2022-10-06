const router = require("express").Router();
const Location = require("../models/Location");

router.post("/", async (req, res) => {
	const { lat, long } = req.body;

	try {
		const isIp = await Location.findOne({ ip: req.ip });
		if (!isIp) {
			const newLocation = new Location({
				visitors: {
					ip: req.ip,
					lat,
					long,
					time: new Date().toLocaleString(),
				},
			});
			const location = await newLocation.save();
		} else return;
		res.json({ location });
	} catch (e) {
		console.log(e);
		res.json("location not found");
	}
});

module.exports = router;
