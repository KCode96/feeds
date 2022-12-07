"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
const app = (0, express_1.default)();
function startServer() {
    // Connect to database
    (0, models_1.connectDB)();
    (0, app_1.default)(app);
    app.listen(3001, () => console.log(`Listening on port ${config_1.PORT}`));
}
startServer();
