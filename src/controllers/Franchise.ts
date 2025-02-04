import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/error";
import Franchise from "../models/franchise";
import { franchiseService } from "../services/franchise";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";
import { applyFranchiseSchema } from "../utils/zod";

// Apply for Franchise Controller
export const applyFranchise = asyncHandler(async (req, res, next) => {
  const data = applyFranchiseSchema.parse(req.body);
  console.log(data);
    const franchiseByEmail = await franchiseService.findFranchiseByEmail(data.email);
    if (franchiseByEmail) {
        return next(new ErrorHandler("You had already applied for a franchise", statusCode.Conflict));
    }
    const franchiseByPhone = await franchiseService.findFranchiseByPhone(data.phone);
    if (franchiseByPhone) {
        return next(new ErrorHandler("You had already applied for a franchise", statusCode.Conflict));
    }
  const franchise = await franchiseService.createFranchise(data);
  return res.status(statusCode.OK).json({ success: true, message: "Franchise applied successfully", franchise });
});


// Get All Franchise Controller
export const getAllFranchise = asyncHandler(async (req, res, next) => {
    const franchise = await franchiseService.getAllFranchise();
    return res.status(statusCode.OK).json({ success: true, franchise });
});


export const getMonthlyFranchiseApplications = async (req: Request, res: Response) => {
    // Aggregation to calculate monthly applications
    const results = await Franchise.aggregate([
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

    const monthNames: string[] = [
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

    const monthlyApplications: Record<string, number> = monthNames.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {} as Record<string, number>);

    results.forEach((result: { _id: { month: number }; totalApplications: number }) => {
      const monthIndex = result._id.month - 1; // MongoDB month is 1-indexed
      monthlyApplications[monthNames[monthIndex]] = result.totalApplications;
    });

    res.status(200).json(monthlyApplications);
};

export const totalApplications = asyncHandler(async (req, res, next) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed, add 1 to match MongoDB's 1-indexed months
    const currentYear = currentDate.getFullYear();

    const totalFranchiseCount = await Franchise.countDocuments();
    const currentMonthFranchiseCount = await Franchise.countDocuments({
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
})