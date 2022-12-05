"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const connect_1 = require("./connect");
Object.defineProperty(exports, "connectDB", { enumerable: true, get: function () { return connect_1.connectDB; } });
