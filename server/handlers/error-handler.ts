import { NextFunction, Request, Response } from "express";
import { ErrorsType } from "../../src/types/error";

export class AppError extends Error {
    status: number;
    errors: ErrorsType[];
    constructor(status: number, message: string, errors: ErrorsType[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message: string, errors: ErrorsType[] = []) {
        return new AppError(400, message, errors);
    }
    static Unauthorized() {
        return new AppError(401, "ACCESS DENIED: UNAUTHORIZED");
    }
    static Forbidden() {
        return new AppError(403, "ACCESS FORBIDDEN");
    }
    static NotFound() {
        return new AppError(404, "RESOURCE NOT FOUND");
    }
    static Internal(status: number = 500, message: string = "INTERNAL ERROR", errors: ErrorsType[]) {
        return new AppError(status, message, errors);
    }
}

export const errorHandler = (e: Error, q: Request, a: Response, next: NextFunction) => {
    console.log(e);
    if(e instanceof AppError)
        return a.status(e.status).json({message: e.message, errors: e.errors});
    return a.status(500).json({message: "INTERNAL ERROR"});
}

