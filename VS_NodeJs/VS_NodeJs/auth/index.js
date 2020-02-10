var express = require("express");
var router = express.Router();

var TokenAPI = require("./tokenApi");

router.get("/token/generate", TokenAPI.generate);

module.exports = router;