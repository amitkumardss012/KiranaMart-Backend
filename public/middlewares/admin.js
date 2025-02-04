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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../services/admin");
const jwt_1 = require("../services/jwt");
const types_1 = require("../types/types");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const error_1 = require("./error");
const isAdmin = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.headers.cookie;
    const frontedToken = (req.headers["authorization"] ? req.headers["authorization"].split("Bearer")[1] : undefined);
    console.log("frontedToken", frontedToken);
    if (!cookie) {
        return next(new ErrorClass_1.default("Token not found", types_1.statusCode.Unauthorized));
    }
    const token = cookie.split("=")[1];
    if (!token)
        return next(new ErrorClass_1.default("Unauthorized", types_1.statusCode.Unauthorized));
    const decoded = jwt_1.jwtService.verifyToken(token);
    const adminById = yield admin_1.AdminService.getAdminById(decoded.id);
    req.admin = adminById;
    next();
}));
exports.default = isAdmin;
