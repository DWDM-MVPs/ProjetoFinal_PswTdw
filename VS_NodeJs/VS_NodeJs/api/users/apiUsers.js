// SCHEMA
var schemaUsers = require('./schemaUsers');

// ROUTES
let apiUsers = require("express").Router();

// CONSOLE LOG
var log = require("../../functions").log;
var validateToken = require("../../functions").validateToken;

// TOKENS
let jwt = require('jsonwebtoken');

// CONFIG
var config = require("../../config");









// ✅ GET USER BY TOKEN
apiUsers.route("/users/get-user/by-name").post(function (req, res)
{
				log("r", "s", "getByName (POST - Users)")

				schemaUsers.findOne({ name: req.body.name }, function (error, produto)
				{
								if (error)
								{
												log("e", "e", error);
												res.status(404).json(error).send();
								}

								log("s", "e", produto);
								res.status(200).json(produto).send();
				});
});



// ✅ ADD PRODUTO TO CARRINHO
apiUsers.route("/users/update-carrinho/add-produto").post(function (req, res)
{
				log("r", "s", "updateProduto/addProduto (POST - Users)");

				schemaUsers.findOne({ name: req.body.name }, function (error, user)
				{
								if (error)
								{
												log("e", "e", error);
												res.status(500).json(error).send();
								}

								var carrinho = JSON.parse(user.carrinho);
								carrinho.items.push(req.body.produto);
								user.carrinho = JSON.stringify(carrinho);

								user.save(function (error)
								{
												if (error)
												{
																log("e", "e", error);
																res.status(500).json(error).send();
												}

												log("u", "e", "Carrinho: " + req.body.carrinho);
												res.status(204).send();
								});
				});
});



apiUsers.route("/users/update-carrinho/remove-produto").post(function (req, res)
{
				log("r", "s", "updateProduto/removeProduto (POST - Users)");

				schemaUsers.findOne({ name: req.body.name }, function (error, user)
				{

				})
})



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
												res.status(401).send(null);
								}
				});
});

apiUsers.route("/test/:token").post(function (req, res)
{
				validateToken(req.params.token, function (err, result)
				{
								console.log(result);
				});
})

// ✅ CLOSE CARRINHO
apiUsers.route("/users/close-carrinho").post(function (req, res)
{
				log("r", "s", "Fechar carrinho: " + req.body.name);

				schemaUsers.findOne({ name: req.body.name }, function (error, user)
				{
								var carrinho = user.carrinho;

								for (var i = 0; i < carrinho.length; i++)
								{
												var obj = carrinho[i];
												console.log(carrinho.name);
								}

								var obj = JSON.parse(user.historico);
								obj['historico'].push(user.carrinho);
								jsonStr = JSON.stringify(obj);
								user.historico = jsonStr;
								user.carrinho = null;

								user.save(function (error)
								{
												if (error)
												{
																log("e", "e", error);
																res.status(500).json(error).send();
												}

												log("u", "e", "Histórico: " + user.historico);
												res.status(204).send();
								});
				});
});





// EXPORT API
module.exports = apiUsers;