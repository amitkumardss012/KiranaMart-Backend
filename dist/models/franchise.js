"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FranchiseSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
}, { timestamps: true });
const Franchise = (0, mongoose_1.model)("Franchise", FranchiseSchema);
exports.default = Franchise;
