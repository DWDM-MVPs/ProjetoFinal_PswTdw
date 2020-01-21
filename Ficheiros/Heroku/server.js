// INIT
var express = require('express')
var app = express();
var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World with Express'));

app.listen(port, function () {
	console.log("Running on port " + port);
});









// INIT MONGO
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

mongoose.connect("mongodb://admin:deloitte@dwdm-tdw-shard-00-00-axldi.azure.mongodb.net:27017,dwdm-tdw-shard-00-01-axldi.azure.mongodb.net:27017,dwdm-tdw-shard-00-02-axldi.azure.mongodb.net:27017/test?ssl=true&replicaSet=DWDM-TDW-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true});
var db = mongoose.connection;





// CHECK DA LIGAÇÃO À BASE DE DADOS
if (!db)
{
	console.log("Erro na ligação à base de dados.")
}
else
{
	console.log("Ligação à base de dados efetuada com sucesso.")
}







// ROUTES
var routes = require("./routes")
app.use('/', routes)