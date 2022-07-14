import { AppError } from "../handlers/error-handler";
import dbService from "./db-service";
import passService from "./pass-service";
import tokenService from "./token-service";

class AuthService {
    async signUserUp(username: string, hash: string) {
        try {
            const foundUser = await dbService.getUserByName(username);
            if(foundUser)
                throw AppError.BadRequest(`USER "${username}" ALREADY EXISTS`);
            const id = await dbService.addUser(username, hash);
            const {accessToken, refreshToken} = tokenService.signToken(id, username);
            await tokenService.saveToken(id, refreshToken);
            return {
                id,
                username,
                accessToken,
                refreshToken
            }
        } catch(e) {
            throw e;
        }
    }
    async logUserIn(username: string, password: string) {
        try {
            const foundUser = await dbService.getUserByName(username);
            if(!foundUser)
                throw AppError.BadRequest(`USER "${username}" WAS NOT FOUND`);
            const {id, password: stored} = foundUser;
            const isValid = await passService.verifyPassword(password, stored);
            if(!isValid)
                throw AppError.BadRequest(`INVALID PASSWORD FOR USER "${username}"`);
            const {accessToken, refreshToken} = tokenService.signToken(id, username);
            await tokenService.saveToken(id, refreshToken);
            return {
                id,
                username,
                accessToken,
                refreshToken
            }
        } catch(e) {
            throw e;
        }
    }
    async logUserOut(token: string) {
        try {
            if(!token)
                throw AppError.Unauthorized();
            await dbService.rmToken(token);
        } catch(e) {
            throw e;
        }
    }
    async refreshUserToken(token: string) {
        try {
            if(!token)
                throw AppError.Unauthorized();
            const decoded = tokenService.verifyToken(token, "refresh");
            const foundToken = await dbService.getTokenByEncoded(token);
            if(!decoded || !foundToken)
                throw AppError.Unauthorized();
            const user = await dbService.getUserById(foundToken.user_id);
            const {accessToken, refreshToken} = tokenService.signToken(user.id, user.username);
            await tokenService.saveToken(user.id, refreshToken);
            return {
                id: user.id,
                username: user.username,
                accessToken,
                refreshToken
            }
        } catch(e) {
            throw e;
        }
    }
}

export default new AuthService();