// TOKENS
let jwt = require('jsonwebtoken');

// CONFIG
var config = require("./config");

module.exports = {
				log: function (t, w, msg)
				{
								var pre;

								if (t == "i") pre = "INFO";
								else if (t == "r") pre = "REQUEST";
								else if (t == "e") pre = "ERROR";
								else if (t == "s") pre = "SENT";
								else if (t == "c") pre = "CREATE";
								else if (t == "l") pre = "LOGIN";
								else if (t == "d") pre = "DELETE";
								else if (t == "u") pre = "UPDATE";

								if (w == "s") console.log("\n # ================================================================ #\n\n" + new Date());

								console.log("\n[" + pre + "] " + msg);

								if (w == "e") console.log("\n # ================================================================ #\n\n\n\n\n\n\n");
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