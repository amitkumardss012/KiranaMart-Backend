import {Router} from "express";
import { asyncHandler } from "../middlewares/error";
import { OurTeamValidationSchema } from "../utils/zod";
import { deleteImage, handleUploadImage } from "../utils/fs";
import OurTeam from "../models/ourTeam";
import { statusCode } from "../types/types";
import upload from "../middlewares/multer";
import ErrorHandler from "../utils/ErrorClass";

const ourTeam = Router()

ourTeam.post("/create", upload.single("image"), asyncHandler(async (req, res, next) => {
    const {name, role} = OurTeamValidationSchema.parse(req.body)
    const image = req.file as Express.Multer.File
    if(!image) return next(new ErrorHandler("Image is required", statusCode.Bad_Request))
    
    const uploadedImage = handleUploadImage(req.file as Express.Multer.File)
    
    const outTeam = await OurTeam.create({name, role, image: uploadedImage.url})

    console.log(ourTeam)

    return res.status(statusCode.Created).json({
        success: true,
        message: "Team member added successfully",
        outTeam
    })
}))

ourTeam.get("/all", asyncHandler(async (req, res, next) => {
    const outTeam = await OurTeam.find()
    return res.status(statusCode.OK).json({
        success: true,
        message: "Team members fetched successfully",
        team: outTeam
    })
}))

ourTeam.delete("/delete/:id", asyncHandler(async (req, res, next) => {
    const {id} = req.params
    if(!id) return next(new ErrorHandler("Please provide a valid id", statusCode.Bad_Request))
    const Team = await OurTeam.findByIdAndDelete(id)
if(!Team) return next(new ErrorHandler("Team member not found", statusCode.Not_Found))
    deleteImage(Team.image)
    return res.status(statusCode.OK).json({
        success: true,
        message: "Team member deleted successfully",
    })
}))

export default ourTeam;