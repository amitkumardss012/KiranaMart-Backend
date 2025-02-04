"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OurTeamSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    role: {
        type: String,
        required: [true, "role is required"],
    },
    image: {
        type: String,
        required: [true, "image is required"],
    },
});
const OurTeam = (0, mongoose_1.model)("OurTeam", OurTeamSchema);
exports.default = OurTeam;
