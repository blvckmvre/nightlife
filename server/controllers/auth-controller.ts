import { NextFunction, Request, Response } from "express";
import { IUser } from "../../src/types/auth";
import authService from "../services/auth-service";
import { validationResult } from "express-validator";
import passService from "../services/pass-service";
import { AppError } from "../handlers/error-handler";

class AuthController {
    async signup(q: Request<{},{},IUser>, a: Response, next: NextFunction) {
        try {
            const errs = validationResult(q);
            if(!errs.isEmpty())
                return next(AppError.BadRequest("UNSUPPORTED INPUT LENGTH", errs.array()));
            const {username, password} = q.body;
            const hash = await passService.hashPassword(password);
            const {
                id,
                accessToken,
                refreshToken
            } = await authService.signUserUp(username, hash);
            a.cookie("refresh", refreshToken, {maxAge: 12*60*60*1000, httpOnly: true});
            return a.json({
                id,
                username,
                accessToken,
                refreshToken
            })
        } catch(e) {
            next(e);
        }
    }
    async login(q: Request<{},{},IUser>, a: Response, next: NextFunction) {
        try {
            const {username, password} = q.body;
            const {
                id,
                accessToken,
                refreshToken
            } = await authService.logUserIn(username, password);
            a.cookie("refresh", refreshToken, {maxAge: 12*60*60*1000, httpOnly: true});
            return a.json({
                id,
                username,
                accessToken,
                refreshToken
            })
        } catch(e) {
            next(e);
        }
    }
    async logout(q: Request, a: Response, next: NextFunction) {
        try {
            const {refresh} = q.cookies;
            await authService.logUserOut(refresh);
            a.clearCookie("refresh");
            return a.json({
                refreshToken: refresh
            })
        } catch(e) {
            next(e);
        }
    }
    async refresh(q: Request, a: Response, next: NextFunction) {
        try {
            const {refresh} = q.cookies;
            const {
                id,
                username,
                accessToken,
                refreshToken
            } = await authService.refreshUserToken(refresh);
            a.cookie("refresh", refreshToken, {maxAge: 12*60*60*1000, httpOnly: true});
            return a.json({
                id,
                username,
                accessToken,
                refreshToken
            })
        } catch(e) {
            next(e);
        }
    }
}

export default new AuthController();