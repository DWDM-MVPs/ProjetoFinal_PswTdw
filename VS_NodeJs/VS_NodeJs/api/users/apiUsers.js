// SCHEMA
var schemaUsers = require("./schemaUsers");
var schemaProdutos = require("../produtos/schemaProdutos");

// ROUTES
let apiUsers = require("express").Router();

// CONSOLE LOG
var log = require("../../functions").log;
var verifyToken = require("../../functions").verifyToken;

// TOKENS
let jwt = require("jsonwebtoken");

// CONFIG
var config = require("../../config");
var lang = require("../../lang");









// ❎ GET USER BY NAME
apiUsers.route("/users/get-user/by-name").post(function (req, res)
{
				log("r", "s", "getByName (POST - Users)")

				schemaUsers.findOne({ name: req.body.name }, function (error, user)
				{
								// SE TIVER DADO ALGUM ERRO A ENCONTAR O UTILIZADOR:
								if (error)
								{
												log("e", "e", error);
												res.status(500).send(lang.error);
								}
								else
								{
												log("s", "e", user);
												res.status(200).json(user);
								}
				});
});



// ❎ GET USER BY TOKEN
apiUsers.route("/users/get-user/by-token").post(function (req, res)
{
				log("r", "s", "/users/get-user/by-token");
				verifyToken(req.body.token, function (error, username)
				{
								// SE TIVER DADO ALGUM ERRO A VERIFICAR O TOKEN
								if (error)
								{
												log("e", "e", error);
												// ENVIA UMA MENSAGEM A DIZER QUE O TOKEN É INVALIDO COM O CÓDIGO 500
												res.status(500).send(lang.invalidToken);
								}
								else
								{
												// CASO NAO TENHA DADO ERRO NENHUM
												// PROCURA UM UTILIZADOR NA BASE DE DADOS QUE CORRESPONDA AO UTILIZADOR GUARDADO NO TOKEN
												schemaUsers.findOne({ name: username }, function (error, utilizador)
												{
																// CASO TENHO DADO ALGUM ERRO A PROCURAR O UTILIZADOR
																if (error)
																{
																				log("e", "e", error);
																				// ENVIA UMA RESPONTA COM O CODIGO 500 A DIZER QUE HOUVE UM ERRO
																				res.status(500).send(lang.error);
																}
																else
																{
																				log("s", "e", utilizador);
																				// SE NAO TIVER HAVIDO NEHHUM ERRO ENVIA O UTILIZADOR ENCONTRADO
																				res.status(200).json(utilizador);
																}
												});
								}
				});
});



// ❎ ADD PRODUTO TO CARRINHO
apiUsers.route("/users/carrinho/add-produto").post(function (req, res)
{
				verifyToken(req.body.token, function (error, username)
				{
								// SE HOUVER ALGUM ERRO A VERIFICAR O TOKEN
								if (error)
								{
												res.status(500).send(lang.invalidToken);
								}
								else
								{
												// SE NAO HOUVER NENHUM ERRO A VERIFICAR O TOKEN, VAI A BASE DE DADOS PROCURAR O UTILIZADOR REFERENCIADO NO TOKEN
												schemaUsers.findOne({ name: username }, function (error, user)
												{
																// CASO TENHA HAVIDO ALGUM ERRO NA PROCURA
																if (error)
																{
																				res.status(500).send(lang.notFound);
																}
																else
																{
																				// CASO NAO, VAI BUSCAR O CARRINHO DO UTILIZADOR
																				var carrinho = user.carrinho || [];
																				// INSERE OS NOVOS PRODUTOS NO CARRINHO
																				carrinho.push(req.body.produto);
																				console.log(carrinho);

																				// GUARDA O CARRINHO NA CONTA DO UTILIZADOR
																				user.carrinho = carrinho;

																				// GUARDA O CARRINHO
																				user.save(function (error)
																				{
																								if (error)
																								{
																												// CASO HAJA ALGUM PROBLEMA A GUARDAR O CARRINHO DO UTILIZADOR NA BASE DE DADOS ENVIA UMA MENSAGEM DE ERRO COM O CÓPDIGO 500 A DIZER QUE HOUVE UM ERRO AO GUARDAR
																												res.status(500).send(lang.saveError);
																								}
																								else
																								{
																												// SENAO ENVIA UMA RESPONSTA 200 SEM NADA
																												res.status(200).send();
																								}
																				});
																}
												});
								}
				})
});



// ❎ REMOVE PRODUTO FROM CARRINHO
apiUsers.route("/users/carrinho/remove-produto").post(function (req, res)
{
				// VERIFICA O TOKEN
				verifyToken(req.body.token, function (error, username)
				{
								if (error)
								{
												res.status(500).send(invalidToken);
								}
								else
								{
												schemaUsers.findOne({ name: username }, function (error, user)
												{
																if (error)
																{
																				res.status(500).send(lang.notFound);
																}
																else
																{
																				// VERIFICA SE O UTILIZADOR TEM UM CARRINHO
																				var carrinho = user.carrinho || [];
																				// REMOVE O PRODUTO DO CARRINHO
																				var index = carrinho.indexOf(req.body.produto);
																				if (index !== -1) carrinho.splice(index, 1);

																				console.log(carrinho);

																				user.carrinho = carrinho;

																				// GUARDA O USER NA BASE DE DADOS
																				user.save(function (error)
																				{
																								if (error)
																								{
																												res.status(500).send(lang.saveError);
																								}
																								else
																								{
																												res.status(200).send();
																								}
																				});
																}
												});
								}
				});
});



// ❎ CLOSE CARRINHO
apiUsers.route("/users/carrinho/close-carrinho").post(function (req, res)
{
				log("r", "s", "/users/close-carrinho: " + req.body.token);
				verifyToken(req.body.token, function (error, username)
				{
								if (error)
								{
												res.status(500).send(lang.invalidToken);
								}
								else
								{
												schemaUsers.findOne({ name: username }, function (error, user)
												{
																if (error)
																{
																				res.status(500).send(lang.notFound);
																}
																else
																{
																				var carrinho = user.carrinho || [];

																				if (carrinho == [])
																				{
																								res.status(500).send(lang.cartEmpty);
																				}
																				else
																				{
																								var preco;
																								carrinho.forEach(function (value, index, array)
																								{
																												schemaProdutos.findOne({ name: value }, function (error, produto)
																												{
																																if (error)
																																{
																																				res.status(500).send(lang.notFound);
																																}
																																else
																																{
																																				preco = preco + produto.price;
																																}
																												})
																								});

																								// VERIFICA SE O UTILIZADOR TEM SALDO
																								if (user.balance < preco)
																								{
																												res.status(500).send(lang.noMoney);
																								}
																								else
																								{
																												// FAZ LOOP PELOS ITEMS DO CARRINHO
																												carrinho.forEach(function (value, index, array)
																												{
																																// PROCURA O PRODUTO ONDE O LOOP ESTÁ
																																schemaProdutos.findOne({ name: value }, function (error, produto)
																																{
																																				// ERRO NA PROCURA...
																																				if (error)
																																				{
																																								res.status(500).send(lang.notFound);
																																				}
																																				else
																																				{
																																								// TIRA 1 DE STOCK AO PRODUTO
																																								produto.stock = produto.stock - 1;

																																								// GUARDA O PRODUTO
																																								produto.save(function (error)
																																								{
																																												if (error)
																																												{
																																																res.status(500).send(lang.saveError);
																																												}
																																								});
																																				}
																																});
																												});
																												// TIRA DINHEIRO AO UTILIZDOR
																												user.balance = user.balance - preco;


																												// GUARDA O CARRINHO NO HISTORICO
																												var historico = user.historico || [];
																												historico.push(carrinho);
																												// APAGA O CARRINHO DO UTILIZADOR
																												user.carrinho = [];
																												user.historico = historico;

																												// GUARDA O UTILIZADOR
																												user.save(function (error)
																												{
																																if (error)
																																{
																																				// ERRO
																																				res.status(500).send(lang.saveError);
																																}
																																else
																																{
																																				// NAO ERRO
																																				res.status(200).send();
																																}
																												});
																								}
																				}
																}
												});
								}
				});
});



// ❎ GET CARRINHO
apiUsers.route("/users/carrinho/get-carrinho").post(function (req, res)
{
				log("r", "s", "/users/get-carrinho: " + req.body.token);
				verifyToken(req.body.token, function (error, username)
				{
								if (error)
								{
												res.status(500).json(error).send();
								}
								else
								{
												// PROCURA O USER
												schemaUsers.findOne({ name: username }, function (error, user)
												{
																if (error)
																{
																				res.status(500).send(lang.notFound);
																}
																else
																{
																				// DEVOLVE O CARRINHO
																				res.status(200).json(user.carrinho);
																}
												});
								}
				});
});



// ❎ LOGIN
apiUsers.route("/users/login").post(function (req, res)
{
				log("l", "s", "login (POST - Users)");
				log("i", "", "Username: " + req.body.name + "\nPassword: " + req.body.password);
				schemaUsers.findOne({ name: req.body.name, password: req.body.password }, function (error, user)
				{
								if (error)
								{
												log("e", "e", error);
												res.status(500).send(lang.notFound);
								}
								else
								{
												if (user)
												{
																log("i", "", "Encontrado um utilizador que corresponde ao Username e Password fornecidos.");

																// GUARDA AS INFORMAÇOES PARA SEREM ADICIONADAS AO TOKEN
																var payload = { name: req.body.name };
																var options = { expiresIn: "1h", };
																var secret = config.tokenSecret;

																// CRIA O TOKEN
																var token = jwt.sign(payload, secret, options);

																// ENVIAR O TOKEN
																log("l", "e", "Token criado: " + token);
																res.status(200).send(token);
												}
												else
												{
																// CASO NAO TENHA SIDO FEITO LOGIN COM SUCESSO ENVIA UMA MENSAGEM A DIZER QUE AS CREDENCIAIS ESTAO INCORRETAS
																log("l", "e", "Nenhum utilizador com a combinação de <name> e <password> foi encontrado.");
																res.status(500).send(lang.notFound);
												}
								}
				});
});



// ❎ USER IS ADMIN
apiUsers.route("/users/is-admin").post(function (req, res)
{
				verifyToken(req.body.token, function (error, username)
				{
								if (error)
								{
												res.status(500).send(lang.invalidToken);
								}
								else
								{
												// PROCURA O USER NA BASE DE DADOS
												schemaUsers.findOne({ name: username }, function (error, user)
												{
																if (error)
																{
																				// EM CASO DE ERRO ENVIA UMA MENSAGEM DE ERRO
																				res.status(500).json(error).send();
																}
																else
																{
																				// SE NAO HOUVER NENHUM ERRO ENVIA UMA BOOLEAN COM TRUE (É ADMIN) OU FALSE (NÃO É)
																				res.status(200).send(user.isAdmin);
																}
												});
								}
				});
});



// ❎ ADD USER
apiUsers.route("/users/add-user").post(function (req, res)
{
				verifyToken(req.body.token, function (error, username)
				{
								if (error)
								{
												res.status(500).send(lang.invalidToken);
								}
								else
								{
												schemaUsers.findOne({ name: username }, function (error, user)
												{
																if (user.isAdmin == true)
																{
																				if (error)
																				{
																								res.status(500).send(lang.invalidToken);
																				}
																				else
																				{
																								// GUARDA O NOVO USER NUMA VARIAVEL
																								var novoUser = new schemaUsers({
																												name: req.body.name,
																												password: req.body.password,
																								});

																								// TENTAR GUARDAR O USER NA BASE DE DADOS
																								novoUser.save(function (error)
																								{
																												// SE HOUVER ALGUM ERRO...
																												if (error)
																												{
																																console.log(error);
																																// ENVIA UMA MENSAGEM DE ERRO PARA O REACT
																																res.status(500).send(lang.saveError);
																												}
																												else
																												{
																																// SE NAO HOUVER ERRO APENAS ENVIA UM CÓDIGO 200
																																res.status(200).send();
																												}
																								});
																				}
																}
																else
																{
																				// ERRO CASO O UTILIZADOR NAO SEJA ADMIN E POR ISSO NAO TEM PERMISSAO PARA CRIAR UM NOVO UTILIZADOR
																				res.status(500).send(lang.noPermission);
																}
												});
								}
				});
});



// ❎ REMOVE USER
apiUsers.route("/users/remove-user").post(function (req, res)
{
				verifyToken(req.body.token, function (error, username)
				{
								schemaUsers.findOne({ name: username }, function (error, user)
								{
												if (user.isAdmin)
												{
																if (error)
																{
																				// ERRO CASO O TOKEN SEJA INVALIDO
																				res.status(500).send(lang.invalidToken);
																}
																else
																{
																				// APAGA O UTILIZADOR REFERENCIADO NO BODY DO REQUEST FEITO PELO REACT
																				schemaProdutos.deleteOne({ name: req.body.name }, function (error)
																				{
																								if (error)
																								{
																												// CASO ACONTECEÇA ALGUM ERRO AO APAGAR O UTILIZADOR
																												console.log(error);
																												res.status(500).send(lang.error);
																								}
																								else
																								{
																												// O UTILIZDOR FOI APAGADO COM SUCESSO, ENTAO É ENVIADO UM CODIGO 200 PARA O REACT PARA CONFIRMAR QUE O UTILIZADOR FOI APAGADO SEM NENHUM ERRO
																												res.status(200).send();
																								}
																				});
																}
												}
												else
												{
																// ERRO CASO O UTILIZADOR NAO SEJA ADMIN E CONSEQUENTEMENTE NAO TENHA PERMISSOES PARA REMOVER UTILIZADORES
																res.status(500).send(lang.noPermission);
												}
								});
				});
});





// EXPORT API
module.exports = apiUsers;