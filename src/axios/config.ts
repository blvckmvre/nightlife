import axios from "axios";
import { IUserData } from "../types/auth";

const baseURL = process.env.REACT_APP_SERVER_URL+"/api";

export const $req = axios.create({
    baseURL,
    withCredentials: true
});

$req.interceptors.request.use(config=>{
    config.headers!.authorization = "Bearer "+localStorage.getItem("access");
    return config;
})
$req.interceptors.response.use(res=>res, async e=>{
    if(e.status!==401 || !e.config || e.config.repeats)
        throw e;
    e.config.repeats = true;
    try {
        const res = await axios.get<IUserData>(baseURL+"/refresh", {withCredentials: true});
        localStorage.setItem("access", res.data.accessToken);
        return $req.request(e.config);
    } catch(err) {
        throw err;
    }
})