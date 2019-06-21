"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var app_1 = require("./app");
var app = new app_1.App(config_1.url);
var interval = 1000;
var count = 1;
var id = setInterval(function () {
    console.log('scrap', count++);
    app.parse().then()["catch"]();
}, interval);
