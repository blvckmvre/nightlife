export enum AuthOperations {
    login = "login",
    signup = "signup",
    logout = "logout",
    refresh = "refresh"
}

export type AuthMutation = AuthOperations.login | AuthOperations.signup;


export interface IUser {
    id: number;
    username: string;
    password: string;
}

export interface IToken {
    user_id: number;
    token: string;
}

export interface IUserData {
    id: number;
    username: string;
    accessToken: string;
    refreshToken: string;
}