"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(err, req, res, next) {
    const statusCode = req.statusCode || 500;
    const message = err.message || 'Internal Server Error!';
    res.status(statusCode).json({ success: false, message, data: null });
}
exports.default = default_1;
