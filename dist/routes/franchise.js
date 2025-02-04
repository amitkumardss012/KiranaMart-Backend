"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Franchise_1 = require("../controllers/Franchise");
const franchiseRoute = (0, express_1.Router)();
franchiseRoute.post("/apply", Franchise_1.applyFranchise);
franchiseRoute.get("/all-franchise", Franchise_1.getAllFranchise);
franchiseRoute.get("/franchise-months", Franchise_1.getMonthlyFranchiseApplications);
franchiseRoute.get("/total-application", Franchise_1.totalApplications);
exports.default = franchiseRoute;
