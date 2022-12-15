"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = require("./api");
const middlewares_1 = require("./api/middlewares");
const startApp = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    (0, api_1.auth)(app);
    (0, api_1.user)(app);
    app.use(middlewares_1.errorHandler);
    app.use(middlewares_1.notFoundHandler);
};
exports.default = startApp;
