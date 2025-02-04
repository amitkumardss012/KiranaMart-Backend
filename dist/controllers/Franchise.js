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
exports.totalApplications = exports.getMonthlyFranchiseApplications = exports.getAllFranchise = exports.applyFranchise = void 0;
const error_1 = require("../middlewares/error");
const franchise_1 = __importDefault(require("../models/franchise"));
const franchise_2 = require("../services/franchise");
const types_1 = require("../types/types");
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const zod_1 = require("../utils/zod");
// Apply for Franchise Controller
exports.applyFranchise = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = zod_1.applyFranchiseSchema.parse(req.body);
    console.log(data);
    const franchiseByEmail = yield franchise_2.franchiseService.findFranchiseByEmail(data.email);
    if (franchiseByEmail) {
        return next(new ErrorClass_1.default("You had already applied for a franchise", types_1.statusCode.Conflict));
    }
    const franchiseByPhone = yield franchise_2.franchiseService.findFranchiseByPhone(data.phone);
    if (franchiseByPhone) {
        return next(new ErrorClass_1.default("You had already applied for a franchise", types_1.statusCode.Conflict));
    }
    const franchise = yield franchise_2.franchiseService.createFranchise(data);
    return res.status(types_1.statusCode.OK).json({ success: true, message: "Franchise applied successfully", franchise });
}));
// Get All Franchise Controller
exports.getAllFranchise = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const franchise = yield franchise_2.franchiseService.getAllFranchise();
    return res.status(types_1.statusCode.OK).json({ success: true, franchise });
}));
const getMonthlyFranchiseApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Aggregation to calculate monthly applications
    const results = yield franchise_1.default.aggregate([
        {
            $group: {
                _id: { month: { $month: "$createdAt" } },
                totalApplications: { $sum: 1 }
            }
        },
        {
            $sort: { "_id.month": 1 }
        }
    ]);
    const monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ];
    const monthlyApplications = monthNames.reduce((acc, month) => {
        acc[month] = 0;
        return acc;
    }, {});
    results.forEach((result) => {
        const monthIndex = result._id.month - 1; // MongoDB month is 1-indexed
        monthlyApplications[monthNames[monthIndex]] = result.totalApplications;
    });
    res.status(200).json(monthlyApplications);
});
exports.getMonthlyFranchiseApplications = getMonthlyFranchiseApplications;
exports.totalApplications = (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed, add 1 to match MongoDB's 1-indexed months
    const currentYear = currentDate.getFullYear();
    const totalFranchiseCount = yield franchise_1.default.countDocuments();
    const currentMonthFranchiseCount = yield franchise_1.default.countDocuments({
        createdAt: {
            $gte: new Date(currentYear, currentMonth - 1, 1),
            $lt: new Date(currentYear, currentMonth, 0)
        }
    });
    return res.status(200).json({
        success: true,
        message: "Total Franchise Count",
        totalFranchiseCount,
        currentMonthFranchiseCount
    });
}));
