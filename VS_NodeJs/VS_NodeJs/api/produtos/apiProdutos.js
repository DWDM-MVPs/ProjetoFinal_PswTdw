// SCHEMA
var schemaProdutos = require('./schemaProdutos');

// ROUTES
let apiProdutos = require("express").Router();

// CONSOLE LOG
var functions = require("../../functions");
var log = functions.log;

// CONFIG
var lang = require("../../lang");









// ❎ GET ALL PRODUTOS
apiProdutos.route("/produtos/get-produtos").post(function (req, res)
{
				log("r", "s", "getAll (POST - Produtos)");

				schemaProdutos.get(function (error, produtos)
				{
								if (error)
								{
												log("e", error);
												res.status(500).send(lang.error);
								}
								else
								{
												log("s", "e", produtos);
												res.status(200).json(produtos);
								}
				});
});



// ❎ GET PRODUTO BY NAME
apiProdutos.route("/produtos/get-produto").post(function (req, res)
{
				log("r", "s", "getByName (POST - Produtos)")
				log("i", "", "Received data: " + req.body.name);

				schemaProdutos.findOne({ name: req.body.name }, function (error, produto)
				{
								if (error)
								{
												log("e", "e", error);
												res.status(500).send(lang.notFound);
								}
								else
								{
												log("s", "e", produto);
												res.status(200).json(produto);
								}
				});
});



// ❎ ADD PRODUTO
apiProdutos.route("/produtos/add-produto").post(function (req, res)
{
				log("r", "s", "addProduto (POST - Produtos)");

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
												log("e", "e", error);
												res.status(500).send(lang.saveError);
								}
								else
								{
												log("c", "e", "Name: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive);
												res.status(200).send();
								}
				});
});



// ❎ UPDATE PRODUTO
apiProdutos.route("/produtos/update-produto").post(function (req, res)
{
				log("r", "s", "updateProduto (POST - Produtos)");

				schemaProdutos.findOne({ name: req.body.oldName }, function (error, produto)
				{
								if (error)
								{
												log("e", "e", error);
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
																				log("e", "e", error);
																				res.status(500).send(lang.saveError);
																}
																else
																{
																				log("u", "e", "Produto: " + req.body.oldName + "\nNome: " + req.body.name + "\nStock: " + req.body.stock + "\nPrice: " + req.body.price + "\nAllergens: " + req.body.allergens + "\nIs Active: " + req.body.isActive);
																				res.status(200).send();
																}
												});
								}
				});
});



// ❎ UPDATE STOCK PRODUTO
apiProdutos.route("/produtos/update-produto/only-stock").post(function (req, res)
{
				log("r", "s", "updateStockProduto (POST - Produtos)");

				schemaProdutos.findOne({ name: req.body.name }, function (error, produto)
				{
								if (error)
								{
												log("e", "e", error);
												res.status(500).send(lang.notFound);
								}
								else
								{
												produto.stock = req.body.stock;

												produto.save(function (error)
												{
																if (error)
																{
																				log("e", "e", error);
																				res.status(500).send(lang.saveError);
																}
																else
																{
																				log("u", "e", "Produto: " + req.body.name + "\nStock: " + req.body.stock);
																				res.status(200).send();
																}
												})
								}
				});
});



// ❎ DELETE PRODUTO
apiProdutos.route("/produtos/delete-produto").post(function (req, res)
{
				log("r", "s", "deleteProduto (POST - Produtos)");

				schemaProdutos.deleteOne({ name: req.body.name }, function (error)
				{
								if (error)
								{
												log("e", "e", error);
												res.status(500).send(lang.notFound);
								}
								else
								{
												log("d", "e", "Nome: " + req.body.name);
												res.status(200).send();
								}
				});
});





// EXPORT API
module.exports = apiProdutos;