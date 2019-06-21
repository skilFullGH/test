"use strict";
exports.__esModule = true;
exports.url = process.env.URL || 'https://reqres.in/api';
exports.host = process.env.HOST || 'localhost';
exports.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
