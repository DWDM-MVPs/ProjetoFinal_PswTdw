var auth = require("./auth");

module.exports = {
				generate: function (req, res)
				{
								response.send(auth.genToken());
				}
};