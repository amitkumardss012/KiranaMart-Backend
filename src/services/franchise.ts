import Franchise from "../models/franchise";
import { ApplyFranchiseType } from "../utils/zod";

export class franchiseService {
    public static async createFranchise(data: ApplyFranchiseType) {
        const franchise = await Franchise.create(data)
        return franchise
    }
    public static async findFranchiseByEmail(email: string) {
        const franchise = await Franchise.findOne({ email })
        return franchise
    }
    public static async findFranchiseByPhone(phone: string) {
        const franchise = await Franchise.findOne({ phone })
        return franchise
    }

    public static async getAllFranchise() {
        const franchise = await Franchise.find()
        return franchise
    }

    public static async getFranchiseByMonths(months: number) {
        const franchise = await Franchise.find({ months })
        return franchise
    }
}