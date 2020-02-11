// SCHEMA
var schemaProdutos = require("./schemaProdutos");
var schemaUsers = require("../produtos/schemaProdutos");

// ROUTES
let apiProdutos = require("express").Router();

// CONSOLE LOG
var log = require("../../functions").log;
var verifyToken = require("../../functions").verifyToken;

// CONFIG
var config = require("../../config");
var lang = require("../../lang");

// LOG TAGS
var logStartTags = config.logStartTags;
var logEndTags = config.logEndTags;









// ✅ GET ALL PRODUTOS
var route_getAllProdutos = "/produtos/get-produtos";
apiProdutos.route(route_getAllProdutos).post(function (req, res)
{
				log("REQUEST", "START", route_getAllProdutos);

				// VAI BUSCAR TODOS OS PRODUTOS A BASE DE DADOS
				schemaProdutos.get(function (error, produtos)
				{
								// CASO HAJA ALGUM ERRO A IR BUSCAR OS PRODUTOS..
								if (error)
								{
												log("ERROR", "END", route_getAllProdutos + logStartTags + error + logEndTags);
												res.status(500).send(lang.error);
								}
								else
								{
												// SE NAO HOUVER NENHUM ERRO A IR BUSCAR OS PRODUTOS, DEVOLVE OS PRODUTOS AO REACT NUMA STRING JSON
												log("SEND", "END", route_getAllProdutos + logStartTags + produtos + ")");
												res.status(200).json(produtos);
								}
				});
});



// ✅ GET PRODUTO BY NAME
var route_getProdutoByName = "/produtos/get-produto";
apiProdutos.route(route_getProdutoByName).post(function (req, res)
{
				log("REQUEST", "START", route_getProdutoByName + logStartTags + "Name: " + req.body.name + logEndTags);

				// VAI A BASE DE DADOS SELECIONAR O PRODUTO COM O NOME ENVIADO PELO REACT
				schemaProdutos.findOne({ name: req.body.name }, function (error, produto)
				{
								// CASO ERRO..
								if (error)
								{
												log("ERROR", "END", route_getProdutoByName + logStartTags + error + logEndTags);
												res.status(500).send(lang.notFound);
								}
								else
								{
												// SENAO ENVIA O PRODUTO ENCONTRADO
												log("SEND", "END", route_getProdutoByName + logStartTags + produto + logEndTags);
												res.status(200).json(produto);
								}
				});
});



// ✅ ADD PRODUTO
var route_addProduto = "/produtos/add-produto";
apiProdutos.route("/produtos/add-produto").post(function (req, res)
{
				verifyToken(req.body.token, function (error, username)
				{
								if (error)
								{
												res.status(500).send(lang.invalidToken);
								}
								else
								{
												schemaUsers.findOne({ 'name': username }, function (err, user)
												{
																if (err)
																{
																				res.status(500).send(lang.notFound);
																}
																else
																{
																				// CASO POR ALGUM MOTIVO O UTILIZADOR ENVIADO NO TOKEN NAO SEJA ADMIN, MANDA UMA MENSAGEM DE ERRO A DIZER QUE O UTILIZADOR NAO TEM PERMISSOES
																				if (user.isAdmin === false)
																				{
																								res.status(500).send(lang.noPermission);
																				}
																				else
																				{
																								// CASO O UTILIZADOR SEJA ADMIN
																								log("REQUEST", "START", route_addProduto + logStartTags + "Name: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive + logEndTags);

																								// GUARDA O NOVO PRODUTO NUMA VARIAVEL
																								var novoProduto = new schemaProdutos({
																												name: req.body.name,
																												stock: req.body.stock,
																												price: req.body.price,
																												allergens: req.body.allergens,
																												isActive: req.body.isActive,
																								});

																								// GUARDA A VARIAVEL COM O PRODUTO NA BASE DE DADOS
																								novoProduto.save(function (error)
																								{
																												// CASO TENHA HAVIDO ALGUM ERRO A GUARDAR O PRODUTO NA BASE DE DADOS
																												if (error)
																												{
																																log("ERROR", "END", route_addProduto + logStartTags + error + logEndTags);
																																res.status(500).send(lang.saveError);
																												}
																												else
																												{
																																// CASO NAO TENHA HAVIDO NENHUM ERRO A CRIAR O PRODUTO APENAS ENVIA O CODIGO 200 PARA DIZER AO REACT QUE O PRODUTO FOI CRIADO COM SUCESSO
																																log("SEND", "END", route_addProduto + logStartTags + "Name: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive + logEndTags);
																																res.status(200).send();
																												}
																								});
																				}
																}
												});
								}
				});
});



// ✅ UPDATE PRODUTO
var route_updateProduto = "/produtos/update-produto";
apiProdutos.route(route_updateProduto).post(function (req, res)
{
				verifyToken(req.body.token, function (error, username)
				{
								// CASO O TOKEN NAO SEJA VALIDO
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
																				if (user.isAdmin == false)
																				{
																								// CASO O UTILIZADOR NAO SEJA ADMIN
																								res.status(500).send(lang.noPermission);
																				}
																				else
																				{
																								// CASO O UTILIZADOR SEJA ADMIN
																								log("REQUEST", "START", route_updateProduto + logStartTags + "Old Name: " + req.body.oldName + "\nName: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive + logEndTags);

																								schemaProdutos.findOne({ name: req.body.oldName }, function (error, produto)
																								{
																												// CASO TENHA HAVIDO ALGUM PROBLEMA A ENCONTRAR O PRODUTO
																												if (error)
																												{
																																log("ERROR", "END", route_updateProduto + logStartTags + error + logEndTags);
																																res.status(500).send(lang.notFound);
																												}
																												else
																												{
																																// GUARDA O PRODUTO NUMA VARIAVEL
																																produto.name = req.body.name;
																																produto.stock = req.body.stock;
																																produto.price = req.body.price;
																																produto.allergens = req.body.allergens;
																																produto.isActive = req.body.isActive;

																																// ENVIA O PRODUTO PARA A BASE DE DADOS
																																produto.save(function (error)
																																{
																																				if (error)
																																				{
																																								// CASO TENHA HAVIDO ALGUM ERRO
																																								log("ERROR", "END", route_updateProduto + logStartTags + error + logEndTags);
																																								res.status(500).send(lang.saveError);
																																				}
																																				else
																																				{
																																								// CASO NAO TENHA HAVIDO NENHUM ERRO AO GUARDAR O PRODUTO NA BASE DE DADOS ENVIA UMA MENSAGEM AO REACT A DIZER QUE O PRODUTO FOI ATUALIZADO COM SUCESSO
																																								log("SEND", "END", route_updateProduto + logStartTags + "Old Name: " + req.body.oldName + "\nName: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive + logEndTags);
																																								res.status(200).send();
																																				}
																																});
																												}
																								});
																				}
																}
												});
								}
				})
});



// ✅ UPDATE STOCK PRODUTO
var route_updateStockProduto = "/produtos/update-produto/only-stock";
apiProdutos.route(route_updateStockProduto).post(function (req, res)
{
				verifyToken(req.body.token, function (error, username)
				{
								if (error)
								{
												// CASO TENHA HAVIDO ALGUM ERRO A VERIFICAR O TOKEN
												res.status(500).send(lang.invalidToken);
								}
								else
								{
												schemaUsers.findOne({ name: username }, function (error, user)
												{
																if (error)
																{
																				// CASO O NOME DO UTILIZADOR NAO TENHA SIDO ENCONTRADO NA BASE DE DADOS
																				res.status(500).send(lang.notFound);
																}
																else
																{
																				if (user.isAdmin == false)
																				{
																								// CASO O UTILZIADOR NAO SEJA ADMIN ENVIA UMA MENSAGEM PARA O REACT A DIZER QUE O UTILIZADOR NAO É ADMIN
																								res.status(500).send(lang.noPermission);
																				}
																				else
																				{
																								log("REQUEST", "START", route_updateStockProduto + logStartTags + "Name: " + req.body.name + "\nStock: " + req.body.stock + logEndTags);

																								schemaProdutos.findOne({ name: req.body.name }, function (error, produto)
																								{
																												// CASO TENHA HAVIDO ALGUM ERRO A ENCONTRAR O PRODUTO NA BASE DE DADOS
																												if (error)
																												{
																																log("ERROR", "END", route_updateStockProduto + logStartTags + error + logEndTags);
																																res.status(500).send(lang.notFound);
																												}
																												else
																												{
																																// SE NAO TIVER HAVIDO NENHUM ERRO A ENCONTRAR O PRODUTO ATUALIZA O STOCK
																																produto.stock = req.body.stock;

																																// E DEPOIS GUARDA O PRODUTO NA BASE DE DADOS
																																produto.save(function (error)
																																{
																																				if (error)
																																				{
																																								// HOUVE ALGUM ERRO A ATUALIZAR O PRODUTO
																																								log("ERROR", "END", route_updateStockProduto + logStartTags + error + logEndTags);
																																								res.status(500).send(lang.saveError);
																																				}
																																				else
																																				{
																																								// ENVIA UMA RESPOSTA AO REACT A DIZER QUE O PRODUTO FOI ATUALIZADO COM SUCESSO
																																								log("SEND", "END", route_updateStockProduto + logStartTags + "Name: " + req.body.name + "\nStock: " + req.body.stock + logEndTags);
																																								res.status(200).send();
																																				}
																																})
																												}
																								});
																				}
																}
												})
								}
				})
});



// ✅ DELETE PRODUTO
var route_deleteProduto = "/produtos/delete-produto";
apiProdutos.route(route_deleteProduto).post(function (req, res)
{
				verifyToken(req.body.token, function (error, username)
				{
								if (error)
								{
												res.status(500).send(lang.invalidToken);
								}
								else
								{
												// PROCURA O NOME DO UTILIZADOR QUE ESTAVA DENTRO DO TOKEN NA BASE DE DADOS PARA VERIFICAR SE ELE É ADMIN OU NÃO
												schemaUsers.findOne({ name: username }, function (error, user)
												{
																// CASO TENHA HAVIDO ALGUM ERRO A PROCURAR O UTILIZADOR NA BASE DE DADOS
																if (error)
																{
																				res.status(500).send(lang.notFound);
																}
																else
																{
																				// CASO O UTILIZADOR NAO SEJA ADMIN
																				if (user.isAdmin == false)
																				{
																								res.status(500).send(lang.noPermission);
																				}
																				else
																				{
																								// CASO O UTILIZADOR SEJA ADMIN
																								log("REQUEST", "START", route_deleteProduto + logStartTags + "Name: " + req.body.name + logEndTags);

																								// APAGA O PRODUTO COM O NOME REFERENCIADO NO BODY
																								schemaProdutos.deleteOne({ name: req.body.name }, function (error)
																								{
																												// CASO HAJA ALGUM PROBLEMA A APAGAR O PRODUTO
																												if (error)
																												{
																																log("ERROR", "END", route_updateStockProduto + logStartTags + error + logEndTags);
																																res.status(500).send(lang.notFound);
																												}
																												else
																												{
																																// CASO NNAO HAJA NENHUM PROBLEMA A APAGAR O PRODUTO
																																log("SEND", "END", route_deleteProduto + logStartTags + "Name: " + req.body.name + logEndTags);
																																res.status(200).send();
																												}
																								});
																				}
																}
												})
								}
				})
});





// EXPORT API
module.exports = apiProdutos;