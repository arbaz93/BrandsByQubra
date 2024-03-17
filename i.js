var express = require('express');
var app = express();
var path = require('path');

var fs = require("fs");
var port = 8080;

app.use(express.static(__dirname));
app.use(express.static('public'));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port);
console.log("app listening on port:" + port);