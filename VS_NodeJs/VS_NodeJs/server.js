var path = require("path");
var staticPath = path.join(__dirname, "/");

var express = require("express");
var app = express();

app.use(express.static(staticPath));


app.set("port", process.env.PORT || 3000);

var server = app.listen(app.get("port"), function () {
	console.log("listening");
});