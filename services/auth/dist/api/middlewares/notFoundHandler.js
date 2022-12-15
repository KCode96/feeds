"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next) {
    res.status(404).json({
        success: false,
        message: `Not Found!`,
        data: null,
    });
}
exports.default = default_1;
