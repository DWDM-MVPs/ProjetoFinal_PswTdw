// INIT
let routesProdutos = require("express").Router();





// ROUTES
var apiProdutos = require("./apiProdutos");

routesProdutos.route("/produtos/get-produtos").get(apiProdutos.getAll);
routesProdutos.route("/produtos/get-produtos/by-name").get(apiProdutos.getByName);

routesProdutos.route("/produtos/add-produto").post(apiProdutos.addProduto);

routesProdutos.route("/produtos/update-produto").patch(apiProdutos.updateProduto);
routesProdutos.route("/produtos/update-produto/by-name/only-price").post(apiProdutos.updatePreco);
routesProdutos.route("/produtos/update-produto/by-name/only-stock").post(apiProdutos.updateStock);

routesProdutos.route("/produtos/delete/:nameProduto").delete(apiProdutos.delete);





// EXPORT API ROUTES
module.exports = routesProdutos;