// INIT
let routesProdutos = require("express").Router();





// ROUTES
var apiProdutos = require("./apiProdutos");

routesProdutos.route("/produtos/get-produtos").get(apiProdutos.getAll);
routesProdutos.route("/produtos/get-produtos/by-name").get(apiProdutos.getByName);

routesProdutos.route("/produtos/add-produto").post(apiProdutos.addProduto);

routesProdutos.route("/produtos/update-produto").post(apiProdutos.update);
routesProdutos.route("/produtos/update-produto/only-price/:idProduto/:preco").post(apiProdutos.updatePreco);
routesProdutos.route("/produtos/update-produto/only-stock/:idProduto/:stock").post(apiProdutos.updateStock);

routesProdutos.route("/produtos/delete/:idProduto").delete(apiProdutos.delete);





// EXPORT API ROUTES
module.exports = routesProdutos;