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
const express_1 = require("express");
const error_1 = require("../middlewares/error");
const zod_1 = require("../utils/zod");
const fs_1 = require("../utils/fs");
const ourTeam_1 = __importDefault(require("../models/ourTeam"));
const types_1 = require("../types/types");
const multer_1 = __importDefault(require("../middlewares/multer"));
const ErrorClass_1 = __importDefault(require("../utils/ErrorClass"));
const ourTeam = (0, express_1.Router)();
ourTeam.post("/create", multer_1.default.single("image"), (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role } = zod_1.OurTeamValidationSchema.parse(req.body);
    const image = req.file;
    if (!image)
        return next(new ErrorClass_1.default("Image is required", types_1.statusCode.Bad_Request));
    const uploadedImage = (0, fs_1.handleUploadImage)(req.file);
    const outTeam = yield ourTeam_1.default.create({ name, role, image: uploadedImage.url });
    console.log(ourTeam);
    return res.status(types_1.statusCode.Created).json({
        success: true,
        message: "Team member added successfully",
        outTeam
    });
})));
ourTeam.get("/all", (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const outTeam = yield ourTeam_1.default.find();
    return res.status(types_1.statusCode.OK).json({
        success: true,
        message: "Team members fetched successfully",
        team: outTeam
    });
})));
ourTeam.delete("/delete/:id", (0, error_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new ErrorClass_1.default("Please provide a valid id", types_1.statusCode.Bad_Request));
    const Team = yield ourTeam_1.default.findByIdAndDelete(id);
    if (!Team)
        return next(new ErrorClass_1.default("Team member not found", types_1.statusCode.Not_Found));
    (0, fs_1.deleteImage)(Team.image);
    return res.status(types_1.statusCode.OK).json({
        success: true,
        message: "Team member deleted successfully",
    });
})));
exports.default = ourTeam;
