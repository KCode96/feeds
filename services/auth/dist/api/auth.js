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
const middlewares_1 = require("./middlewares");
const schemas_1 = require("../schemas");
const services_1 = require("../services");
function default_1(app) {
    console.log(app.request);
    // POST /register
    app.post('/api/register', (0, middlewares_1.validateRequest)(schemas_1.authSchema.registerUser), (req, res) => __awaiter(this, void 0, void 0, function* () {
        const user = yield services_1.authService.register(req.body);
        res.status(201).json({ success: true, data: user, message: '' });
    }));
    // POST /login
    app.post('/api/login', (0, middlewares_1.validateRequest)(schemas_1.authSchema.loginUser), (req, res) => __awaiter(this, void 0, void 0, function* () {
        const token = yield services_1.authService.login(req.body);
        res.status(200).json({
            success: true,
            token,
        });
    }));
    // POST /forgot-password
    app.post('/api/forgot-password', (0, middlewares_1.validateRequest)(schemas_1.authSchema.forgotPassword), (req, res) => __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        yield services_1.authService.forgotPassword(email);
        res.status(200).json({
            success: true,
            message: '',
        });
    }));
}
exports.default = default_1;
