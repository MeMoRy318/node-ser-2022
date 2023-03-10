"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrors = void 0;
class ApiErrors extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.ApiErrors = ApiErrors;
