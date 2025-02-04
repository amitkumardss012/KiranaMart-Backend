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
exports.fileCleanup = exports.deleteImage = exports.handleUploadImage = exports.handleUdateImage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fs_2 = require("fs");
const handleUdateImage = (currentImage, newImage) => {
    if (currentImage) {
        const imagePath = path_1.default.join(__dirname, '../..', currentImage.url);
        if (fs_1.default.existsSync(imagePath)) {
            fs_1.default.unlinkSync(imagePath);
        }
    }
    return { url: `/uploads/${newImage.filename}` };
};
exports.handleUdateImage = handleUdateImage;
const handleUploadImage = (newImage) => {
    return { url: `/uploads/${newImage.filename}` };
};
exports.handleUploadImage = handleUploadImage;
const deleteImage = (imageUrl) => {
    const imagePath = path_1.default.join(__dirname, '../..', imageUrl);
    if (fs_1.default.existsSync(imagePath)) {
        fs_1.default.unlinkSync(imagePath);
    }
};
exports.deleteImage = deleteImage;
const fileCleanup = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const filePath = path_1.default.resolve(req.file.path);
        yield fs_2.promises.unlink(filePath).catch(err => {
            console.error(`Failed to delete file: ${filePath}`, err);
        });
    }
});
exports.fileCleanup = fileCleanup;
