// SCHEMA
var schemaUsers = require('./schemaUsers');

// ROUTES
let apiUsers = require("express").Router();

// CONSOLE LOG
var log = require("../../functions").log;
var verifyToken = require("../../functions").verifyToken;

// TOKENS
let jwt = require('jsonwebtoken');

// CONFIG
var config = require("../../config");









// ✅ GET USER BY NAME
apiUsers.route("/users/get-user/by-name").post(function (req, res)
{
				log("r", "s", "getByName (POST - Users)")

				schemaUsers.findOne({ name: req.body.name }, function (error, produto)
				{
								if (error)
								{
												log("e", "e", error);
												res.status(500).json(error).send();
								}

								log("s", "e", produto);
								res.status(200).json(produto).send();
				});
});



// ✅ GET USER BY TOKEN
apiUsers.route("/users/get-user/by-token").post(function (req, res)
{
				log("r", "s", "getByToken (POST - Users)")

				verifyToken(req.body.token, function (err, username)
				{
								if (err)
								{
												res.status(500).json(error).send();
								}
								schemaUsers.findOne({ name: username }, function (error, produto)
								{
												if (error)
												{
																log("e", "e", error);
																res.status(500).json(error).send();
												}

												log("s", "e", produto);
												res.status(200).json(produto).send();
								});
				});
});


// ✅ ADD PRODUTO TO CARRINHO
apiUsers.route("/users/carrinho/add-produto").post(function (req, res)
{
				verifyToken(req.body.token, function (err, username)
				{
								if (err)
								{
												res.status(500).json(err).send();
								}

								schemaUsers.findOne({ name: username }, function (error, user)
								{
												if (error)
												{
																res.status(500).json(error).send();
												}
												
												var carrinho = user.carrinho || [];
												carrinho.push(req.body.produto);
												console.log(carrinho);

												user.carrinho = carrinho;

												user.save(function (error)
												{
																console.log(error);
																if (error)
																{
																				res.status(500).json(error).send();
																}
																res.status(200).send();
												})
								});
				})
});




// ✅ REMOVE PRODUTO FROM CARRINHO
apiUsers.route("/users/carrinho/remove-produto").post(function (req, res)
{
				verifyToken(req.body.token, function (err, username)
				{
								if (err)
								{
												res.status(500).json(err).send();
								}

								schemaUsers.findOne({ name: username }, function (error, user)
								{
												if (error)
												{
																res.status(500).json(error).send();
												}

												var carrinho = user.carrinho || [];
												var index = carrinho.indexOf(req.body.produto);
												if (index !== -1) carrinho.splice(index, 1);
												console.log(carrinho);

												user.carrinho = carrinho;

												user.save(function (error)
												{
																console.log(error);
																if (error)
																{
																				res.status(500).json(error).send();
																}
																res.status(200).send();
												})
								});
				})
});



// ✅ CLOSE CARRINHO
apiUsers.route("/users/close-carrinho").post(function (req, res)
{
				log("r", "s", "/users/close-carrinho: " + req.body.token);

				verifyToken(req.body.token, function (err, username)
				{
								if (err)
								{
												res.status(500).json(err).send();
								}
								schemaUsers.findOne({ name: username }, function (error, user)
								{
												if (error)
												{
																res.status(500).json(error).send();
												}

												var carrinho = user.carrinho || [];

												if (carrinho == [])
												{
																res.status(500).send();
												}
												var historico = user.historico || [];
												historico.push(carrinho);

												user.carrinho = [];
												user.historico = historico;


												user.save(function (error)
												{
																console.log(error);
																if (error)
																{
																				res.status(500).json(error).send();
																}
																res.status(200).send();
												})
								});
				});
});


// ✅ GET CARRINHO
apiUsers.route("/users/get-carrinho").post(function (req, res)
{
				log("r", "s", "/users/get-carrinho: " + req.body.token);
				
				verifyToken(req.body.token, function (err, username)
				{
								if (err)
								{
												res.status(500).json(err).send();
								}
								schemaUsers.findOne({ name: username }, function (error, user)
								{
												if (error)
												{
																res.status(500).json(error).send();
												}

												var carrinho = user.carrinho || [];

												if (carrinho == [])
												{
																res.status(500).send();
												}
												var historico = user.historico || [];
												historico.push(carrinho);

												user.carrinho = [];
												user.historico = historico;


												user.save(function (error)
												{
																console.log(error);
																if (error)
																{
																				res.status(500).json(error).send();
																}
																res.status(200).send();
												})
								});
				});
});



// ✅ LOGIN
apiUsers.route("/users/login").post(function (req, res)
{
				log("l", "s", "login (POST - Users)");
				log("i", "", "Username: " + req.body.name + "\nPassword: " + req.body.password);

				schemaUsers.findOne({ name: req.body.name, password: req.body.password }, function (error, user)
				{
								if (error)
								{
												log("e", "e", error);
												res.status(500).json(error).send();
								}

								if (user)
								{
												log("i", "", "Encontrado um utilizador que corresponde ao Username e Password fornecidos.");


												var payload = { name: req.body.name };
												var options = { expiresIn: "1h", };
												var secret = config.tokenSecret;

												var token = jwt.sign(payload, secret, options);

												log("l", "e", "Token criado: " + token);
												res.status(200).send(token);
								}
								else
								{
												log("l", "e", "Nenhum utilizador com a combinação de <name> e <password> foi encontrado.");
												res.status(500).send(null);
								}
				});
});



// ✅ USER IS ADMIN
apiUsers.route("/users/is-admin").post(function (req, res)
{
				verifyToken(req.body.token, function (err, username)
				{
								if (err)
								{
												res.status(500).json(err).send();
								}
								schemaUsers.findOne({ name: username }, function (error, user)
								{
												if (error)
												{
																res.status(500).json(error).send();
												}

												if (user.isAdmin == true)
												{
																res.status(200).send(true);
												}
												else
												{
																res.status(200).send(false);
												}
								});
				});
});





// EXPORT API
module.exports = apiUsers;