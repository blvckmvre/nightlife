import { $req } from "../axios/config";
import { AuthMutation, IUserData } from "../types/auth";

interface ILogoutResponse {
    refreshToken: string;
}

export class AuthService {
    static mutation(username: string, password: string, type: AuthMutation) {
        return $req.post<IUserData>("/"+type, {username, password});
    }
    static logout() {
        return $req.get<ILogoutResponse>("/logout");
    }
    static refresh() {
        return $req.get<IUserData>("/refresh");
    }
}