// INIT
var path = require("path");
var staticPath = path.join(__dirname, "/");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(staticPath));
app.use(bodyParser.json());

var server = app.listen(app.get("port"), function () {
	console.log("Bar Escolar API started.");
});

app.get("/api", (req, res) => {
	res.send("API do Bar Escolar online!");
})



// MONGOOSE & MONGO DB
mongoose.connect("mongodb://localhost:27017/barEscolar", { useNewUrlParser: true });






// ROUTES
var routesProdutos = require("./produtos/routesProdutos");
app.use("/api/", routesProdutos);