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
exports.forgotPassword = exports.login = exports.register = void 0;
const models_1 = require("../models");
const register = ({ username, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ email }).select('-password');
    if (user)
        throw new Error(`${email} already registered`);
    const newUser = yield yield models_1.User.create({
        username,
        email,
        password,
    });
    delete newUser.password;
    return newUser;
});
exports.register = register;
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ email });
    if (!user)
        throw new Error(`${email} is not registered yet`);
    const isMatch = yield user.matchPassword(password);
    if (!isMatch)
        throw new Error(`Invalid credentials`);
    const token = user.getSignedJwtToken(user.id);
    return token;
});
exports.login = login;
const forgotPassword = (email) => { };
exports.forgotPassword = forgotPassword;
