// SCHEMA
var schemaProdutos = require('./schemaProdutos');

// ROUTES
let apiProdutos = require("express").Router();

// CONSOLE LOG
var functions = require("../../functions");
var log = functions.log;

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

				schemaProdutos.get(function (error, produtos)
				{
								if (error)
								{
												log("ERROR", "END", route_getAllProdutos + logStartTags + error + logEndTags);
												res.status(500).send(lang.error);
								}
								else
								{
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

				schemaProdutos.findOne({ name: req.body.name }, function (error, produto)
				{
								if (error)
								{
												log("ERROR", "END", route_getProdutoByName + logStartTags + error + logEndTags);
												res.status(500).send(lang.notFound);
								}
								else
								{
												log("SEND", "END", route_getProdutoByName + logStartTags + produto + logEndTags);
												res.status(200).json(produto);
								}
				});
});



// ✅ ADD PRODUTO
var route_addProduto = "/produtos/add-produto";
apiProdutos.route("/produtos/add-produto").post(function (req, res)
{
				log("REQUEST", "START", route_addProduto + logStartTags + "Name: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive + logEndTags);

				var novoProduto = new schemaProdutos({
								name: req.body.name,
								stock: req.body.stock,
								price: req.body.price,
								allergens: req.body.allergens,
								isActive: req.body.isActive,
				});

				novoProduto.save(function (error)
				{
								if (error)
								{
												log("ERROR", "END", route_addProduto + logStartTags + error + logEndTags);
												res.status(500).send(lang.saveError);
								}
								else
								{
												log("SEND", "END", route_addProduto + logStartTags + "Name: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive + logEndTags);
												res.status(200).send();
								}
				});
});



// ✅ UPDATE PRODUTO
var route_updateProduto = "/produtos/update-produto";
apiProdutos.route(route_updateProduto).post(function (req, res)
{
				log("REQUEST", "START", route_updateProduto + logStartTags + "Old Name: " + req.body.oldName + "\nName: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive + logEndTags);

				schemaProdutos.findOne({ name: req.body.oldName }, function (error, produto)
				{
								if (error)
								{
												log("ERROR", "END", route_updateProduto + logStartTags + error + logEndTags);
												res.status(500).send(lang.notFound);
								}
								else
								{
												produto.name = req.body.name;
												produto.stock = req.body.stock;
												produto.price = req.body.price;
												produto.allergens = req.body.allergens;
												produto.isActive = req.body.isActive;

												produto.save(function (error)
												{
																if (error)
																{
																				log("ERROR", "END", route_updateProduto + logStartTags + error + logEndTags);
																				res.status(500).send(lang.saveError);
																}
																else
																{
																				log("SEND", "END", route_updateProduto + logStartTags + "Old Name: " + req.body.oldName + "\nName: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive + logEndTags);
																				res.status(200).send();
																}
												});
								}
				});
});



// ✅ UPDATE STOCK PRODUTO
var route_updateStockProduto = "/produtos/update-produto/only-stock";
apiProdutos.route(route_updateStockProduto).post(function (req, res)
{
				log("REQUEST", "START", route_updateStockProduto + logStartTags + "Name: " + req.body.name + "\nStock: " + req.body.stock + logEndTags);

				schemaProdutos.findOne({ name: req.body.name }, function (error, produto)
				{
								if (error)
								{
												log("ERROR", "END", route_updateStockProduto + logStartTags + error + logEndTags);
												res.status(500).send(lang.notFound);
								}
								else
								{
												produto.stock = req.body.stock;

												produto.save(function (error)
												{
																if (error)
																{
																				log("ERROR", "END", route_updateStockProduto + logStartTags + error + logEndTags);
																				res.status(500).send(lang.saveError);
																}
																else
																{
																				log("SEND", "END", route_updateStockProduto + logStartTags + "Name: " + req.body.name + "\nStock: " + req.body.stock + logEndTags);
																				res.status(200).send();
																}
												})
								}
				});
});



// ✅ DELETE PRODUTO
var route_deleteProduto = "/produtos/delete-produto";
apiProdutos.route(route_deleteProduto).post(function (req, res)
{
				log("REQUEST", "START", route_deleteProduto + logStartTags + "Name: " + req.body.name + logEndTags);

				schemaProdutos.deleteOne({ name: req.body.name }, function (error)
				{
								if (error)
								{
												log("ERROR", "END", route_updateStockProduto + logStartTags + error + logEndTags);
												res.status(500).send(lang.notFound);
								}
								else
								{
												log("SEND", "END", route_deleteProduto + logStartTags + "Name: " + req.body.name + logEndTags);
												res.status(200).send();
								}
				});
});





// EXPORT API
module.exports = apiProdutos;