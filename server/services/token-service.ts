import jwt from "jsonwebtoken";
import dbService from "./db-service";

const accessSecret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;

class TokenService {
    signToken(id: number, username: string) {
        const accessToken = jwt.sign({
            id, username
        }, accessSecret, {expiresIn: "30m"});
        const refreshToken = jwt.sign({
            id, username
        }, refreshSecret, {expiresIn: "12h"});
        return {
            accessToken,
            refreshToken,
        }
    }
    verifyToken(token: string, type: "access" | "refresh") {
        try {
            const secret = type==="access" ? accessSecret : refreshSecret;
            const decoded = jwt.verify(token, secret);
            return decoded;
        } catch(e) {
            throw e;
        }
    }
    async saveToken(id: number, token: string) {
        const foundToken = await dbService.getTokenById(id);
        if(foundToken)
            await dbService.updateToken(id, token);
        else
            await dbService.addToken(id,token);
    }
}

export default new TokenService();