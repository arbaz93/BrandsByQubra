var express = require('express');
const serverless = require('serverless-http');
var app = express();
const router = express.Router();
var path = require('path');

var fs = require("fs");
var port = 8080;

app.use('/.netlify/functions.api', router);
module.exports.handler = serverless(app);

// app.use(express.static(__dirname));
// app.use(express.static('public'));
// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

// app.listen(port);
console.log("app listening on port:" + port);