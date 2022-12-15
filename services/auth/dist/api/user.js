"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const middlewares_1 = require("./middlewares");
const schemas_1 = require("../schemas");
function default_1(app) {
    app.get('/api/users', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const users = yield services_1.userService.getAllUsers();
        res.status(200).json({ message: '', data: users, success: true });
    }));
    app.get('/api/users/:id', (0, middlewares_1.validateRequest)(schemas_1.userSchema.getUser), (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield services_1.userService.getUserById(id);
        res.status(200).json({ message: '', data: user, success: true });
    }));
    app.put('/api/users/:id', (0, middlewares_1.validateRequest)(schemas_1.userSchema.getUser), (req, res) => __awaiter(this, void 0, void 0, function* () { }));
}
exports.default = default_1;
