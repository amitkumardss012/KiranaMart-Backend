import {Router} from "express"
import { applyFranchise, getAllFranchise, getMonthlyFranchiseApplications, totalApplications } from "../controllers/Franchise"
import isAdmin from "../middlewares/admin"

const franchiseRoute = Router()
franchiseRoute.post("/apply", applyFranchise)

franchiseRoute.get("/all-franchise", getAllFranchise)
franchiseRoute.get("/franchise-months", getMonthlyFranchiseApplications)
franchiseRoute.get("/total-application", totalApplications)


export default franchiseRoute


