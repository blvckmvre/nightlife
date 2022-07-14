import { NextFunction, Response } from "express";
import { AppError } from "../handlers/error-handler";
import tokenService from "../services/token-service";
import { CustomRequest, IDecoded } from "../../src/types/express";

const auth = (q: CustomRequest, a: Response, next: NextFunction) => {
    try {
        const authHeader = q.headers.authorization;
        if(!authHeader)
            return next(AppError.Unauthorized());
        const token = authHeader.split(" ")[1];
        if(!token)
            return next(AppError.Unauthorized());
        const decoded = tokenService.verifyToken(token, "access");
        if(!decoded)
            return next(AppError.Unauthorized());
        q.user = decoded as IDecoded;
        next();
    } catch(e) {
        return next(AppError.Unauthorized());
    }
}

export default auth;