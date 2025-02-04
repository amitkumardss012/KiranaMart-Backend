"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const playStoreLinkSchema = new mongoose_1.Schema({
    link: {
        type: String,
        required: true,
    },
});
const PlayStoreLink = (0, mongoose_1.model)("PlayStoreLink", playStoreLinkSchema);
exports.default = PlayStoreLink;
