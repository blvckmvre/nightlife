import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../../src/types/express";
import { AppError } from "../handlers/error-handler";
import yelpService from "../services/yelp-service";

class BarsController {
    async getAll(q: Request, a: Response ,next: NextFunction) {
        try {
            const {lat,lon}: any = q.query;
            const bars = await yelpService.getBars(lat,lon);
            return a.json(bars);
        } catch(e) {
            next(e);
        }
    }
    async getDetails(q: Request, a: Response ,next: NextFunction) {
        try {
            const {bar_id}: any = q.query;
            const bar = await yelpService.getBarInfo(bar_id);
            return a.json(bar);
        } catch(e) {
            next(e);
        }
    }
    async addUser(q: CustomRequest, a: Response ,next: NextFunction) {
        try {
            const {bar_id,username} = q.body;
            if(q.user!.username!==username)
                return next(AppError.BadRequest("YOU ARE NOT ALLOWED TO DECIDE FOR ANOTHER USER"));
            await yelpService.addToBar(bar_id,username);
            return a.json({bar_id, username});
        } catch(e) {
            next(e);
        }
    }
    async rmUser(q: CustomRequest, a: Response ,next: NextFunction) {
        try {
            const {bar_id,username} = q.body;
            if(q.user!.username!==username)
                return next(AppError.BadRequest("YOU ARE NOT ALLOWED TO DECIDE FOR ANOTHER USER"));
            await yelpService.rmFromBar(bar_id,username);
            return a.json({bar_id, username});
        } catch(e) {
            next(e);
        }
    }
}

export default new BarsController();