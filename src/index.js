"use strict";
var express = require('express');
var index = express();
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(8080, function () {
    console.log("app listening on 8080 port");
});
