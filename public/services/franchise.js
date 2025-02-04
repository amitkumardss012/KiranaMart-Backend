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
exports.franchiseService = void 0;
const franchise_1 = __importDefault(require("../models/franchise"));
class franchiseService {
    static createFranchise(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const franchise = yield franchise_1.default.create(data);
            return franchise;
        });
    }
    static findFranchiseByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const franchise = yield franchise_1.default.findOne({ email });
            return franchise;
        });
    }
    static findFranchiseByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const franchise = yield franchise_1.default.findOne({ phone });
            return franchise;
        });
    }
    static getAllFranchise() {
        return __awaiter(this, void 0, void 0, function* () {
            const franchise = yield franchise_1.default.find();
            return franchise;
        });
    }
    static getFranchiseByMonths(months) {
        return __awaiter(this, void 0, void 0, function* () {
            const franchise = yield franchise_1.default.find({ months });
            return franchise;
        });
    }
}
exports.franchiseService = franchiseService;
