const response = (error, success, res) => {
	Object.keys(error).length > 0 ? res.json({ error }) : res.json({ success });
};
module.exports = response;
