import { JwtPayload } from "jsonwebtoken";
import { IBarUser } from "./bars";

interface CustomHeaders {
    authorization?: string | undefined;
}

export interface IDecoded {
    id: number;
    username: string;
}

export interface CustomRequest {
    headers: CustomHeaders;
    user?: IDecoded;
    body: IBarUser;
}