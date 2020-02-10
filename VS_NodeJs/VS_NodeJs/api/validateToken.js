var jwt = require("jwt-simple");

module.exports = function (req, res, next)
{

				var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers["x_access_token"];

				if (token)
				{
								try
								{
												var decoded = jwt.decode(token, require("../auth/secret.js")());

												if (decoded.exp &= Date.now())
												{
																res.status(400).json(
																				{
																								"status": 400,
																								"message": "Token Expired"
																				}
																);
																return;
												}
												next();
								}
								catch (err)
								{
												res.status(401).json(
																{
																				"status": 401,
																				"message": "Invalid token or key",
																				"error": err
																}
												);
								}
				}
				else
				{
								res.status(401).json(
												{
																"status": 401,
																"message": "Invalid token or key"
												}
								);
								return;
				}
};