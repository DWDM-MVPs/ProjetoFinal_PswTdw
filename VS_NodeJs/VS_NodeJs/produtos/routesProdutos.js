// INIT
let routesProdutos = require("express").Router();





// ROUTES
var apiProdutos = require("./apiProdutos");

routesProdutos.route("/produtos/get-produtos").get(apiProdutos.getAll);
routesProdutos.route("/produtos/get-produtos/by-name/:nameProduto").get(apiProdutos.getByName);

routesProdutos.route("/produtos/add-produto").post(apiProdutos.addProduto);

routesProdutos.route("/produtos/update-produto/by-name/:nameProduto").post(apiProdutos.update);
routesProdutos.route("/produtos/update-produto/by-name/only-price/:nameProduto/:preco").post(apiProdutos.updatePreco);
routesProdutos.route("/produtos/update-produto/by-name/only-stock/:nameProduto/:stock").post(apiProdutos.updateStock);

routesProdutos.route("/produtos/delete/:nameProduto").delete(apiProdutos.delete);





// EXPORT API ROUTES
module.exports = routesProdutos;