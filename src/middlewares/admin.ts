import { AdminService } from "../services/admin";
import { jwtService } from "../services/jwt";
import { decoded, statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";
import { asyncHandler } from "./error";

const isAdmin = asyncHandler(async (req, res, next) => {
    const cookie = req.headers.cookie
        const frontedToken = (req.headers["authorization"] ? req.headers["authorization"].split("Bearer")[1] : undefined);
        console.log("frontedToken", frontedToken)

    if (!cookie) {
      return next(new ErrorHandler("Token not found", statusCode.Unauthorized));
    }
    const token = cookie.split("=")[1];
    if (!token)
      return next(new ErrorHandler("Unauthorized", statusCode.Unauthorized));
    const decoded = jwtService.verifyToken(token) as decoded;
    const adminById = await AdminService.getAdminById(decoded.id);
    req.admin = adminById;
    next();
});

export default isAdmin