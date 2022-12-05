"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.auth = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.auth = auth_1.default;
const user_1 = __importDefault(require("./user"));
exports.user = user_1.default;
