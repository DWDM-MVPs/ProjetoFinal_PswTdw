// TOKENS
let jwt = require('jsonwebtoken');

// CONFIG
var config = require("./config");

module.exports = {
				log: function (tag, position, logMessage)
				{
								if (position == "START") console.log("\n # ================================================================ #\n\n" + new Date());

								console.log("\n[" + tag + "] " + logMessage);

								if (position == "END") console.log("\n # ================================================================ #\n\n\n\n\n\n\n");
				},
				verifyToken: function (token, callback)
				{
								try
								{
												jwt.verify(token, config.tokenSecret, function (err, decoded)
												{
																callback(err, decoded.name);
												});
								}
								catch (err)
								{
												callback(err, null);
								}
				},
};;