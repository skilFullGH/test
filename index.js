"use strict";
exports.__esModule = true;
var express = require("express");
var routes_1 = require("./routes");
var config_1 = require("./config");
var server = express();
server.use('/api', routes_1.routes);
server.use(function (err, req, res, next) {
    return res.status(400).json({
        status: 400,
        error: err.toString()
    });
});
server.use('*', function (req, res) {
    return res.status(404).json({
        status: 404
    });
});
server.listen(config_1.port, config_1.host);
