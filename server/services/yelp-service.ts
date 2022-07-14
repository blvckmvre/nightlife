import axios from "axios";
import dbService from "./db-service";
import { IBarDetailed, IBarsResponse } from "../../src/types/bars";
import { AppError } from "../handlers/error-handler";
require("dotenv").config();



const baseURL = process.env.YELP_API_URL!

const $ax = axios.create({
    baseURL,
    withCredentials: true,
});
$ax.interceptors.request.use(config=>{
    config.headers!.authorization = "Bearer "+process.env.YELP_API_KEY;
    return config;
})

class YelpService {
    async getBars(latitude: number,longitude: number) {
        try {
            const barUsers = await dbService.getBarUsers();
            const params = {
                latitude,
                longitude,
                categories: "bars",
                limit: 10
            };
            const res = await $ax.get<IBarsResponse>("/search", {params});
            res.data.businesses.forEach(business=>{
                const users = barUsers.filter(user=>user.bar_id===business.id);
                business.users = users.length;
            });
            return res.data;
        } catch(e) {
            throw e;
        }
    }
    async getBarInfo(bar_id: string) {
        try {
            const barUsers = await dbService.getBarUsersById(bar_id);
            const res = await $ax.get<IBarDetailed>("/"+bar_id);
            if(barUsers.length)
                res.data.users = barUsers.map(user=>user.username);
            return res.data;
        } catch(e) {
            throw e;
        }
    }
    async addToBar(bar_id: string, username: string) {
        try {
            const foundUser = await dbService.getOneBarUser(bar_id, username);
            if(foundUser)
                throw AppError.BadRequest(`USER ${username} IS ALREADY GOING THERE`);
            await dbService.addUserToBar(bar_id, username);
        } catch(e) {
            throw e;
        }
    }
    async rmFromBar(bar_id: string, username: string) {
        try {
            const foundUser = await dbService.getOneBarUser(bar_id, username);
            if(!foundUser)
                throw AppError.BadRequest(`USER ${username} IS ALREADY NOT GOING THERE`);
            await dbService.rmUserFromBar(bar_id, username);
        } catch(e) {
            throw e;
        }
    }
}

export default new YelpService();