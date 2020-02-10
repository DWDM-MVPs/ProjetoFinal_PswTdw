var jwt = require("jwt-simple");

module.exports = {
				genToken: function ()
				{
								var expires = this.expiresIn("1h");
								var token = jwt.encode(
												{
																exp: expires
												}, require("./secret")());
								return {
												token: token,
												expires: expires
								};
				},
				expiresIn: function (numDays)
				{
								var dateObj = new Date();
								return dateObj.setDate(dateObj.getDate() + numDays);
				}
}