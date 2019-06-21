"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var fs = require("fs");
var path = require("path");
var App = /** @class */ (function () {
    function App(url) {
        this.url = url;
    }
    ;
    App.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get(this.url + '/users/' + id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: result.data
                            }];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: err_1.toString()
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.getImage = function (idUser) {
        return __awaiter(this, void 0, void 0, function () {
            var image, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = '';
                        if (!fs.existsSync(path.resolve("data/" + idUser))) return [3 /*break*/, 1];
                        image = fs.readFileSync(path.resolve("data/" + idUser), 'UTF8');
                        return [2 /*return*/, {
                                success: true,
                                data: image
                            }];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get(this.url + "/users/" + idUser + "/avatar")];
                    case 2:
                        result = _a.sent();
                        image = Buffer.from(result.data).toString('base64');
                        fs.writeFileSync(path.resolve("data/" + idUser), image);
                        return [2 /*return*/, {
                                success: true,
                                data: image
                            }];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: err_2.toString()
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.deleteImage = function (idUser) {
        fs.unlinkSync(path.resolve("data/" + idUser));
        return {
            success: true
        };
    };
    App.prototype.parse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            page: 0,
                            users: []
                        };
                        if (fs.existsSync(path.resolve("data/users.json"))) {
                            data = JSON.parse(fs.readFileSync(path.resolve("data/users.json"), 'UTF8'));
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get(this.url + '/users?page=' + (data.page + 1))];
                    case 2:
                        result = _a.sent();
                        if (result.data.total_pages >= data.page + 1) {
                            data.page++;
                        }
                        data.users = data.users.concat([
                            result.data.data
                        ]);
                        fs.writeFileSync(path.resolve("data/users.json"), JSON.stringify(data));
                        return [2 /*return*/, {
                                success: true,
                                data: result.data
                            }];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: err_3.toString()
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
