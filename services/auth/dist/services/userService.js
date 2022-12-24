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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const models_1 = require("../models");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.User.find().select(['-password', '-__v']);
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.User.findById(id).select(['-password', '-__v']);
});
exports.getUserById = getUserById;
const updateUser = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(id).select(['-password', '-__v']);
    return yield models_1.User.findByIdAndUpdate(id, body, { new: true }).select([
        '-password',
        '-__v',
    ]);
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.User.deleteOne({ id });
});
exports.deleteUser = deleteUser;
