import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth-service";
import { AuthMutation, IUserData } from "../../types/auth";

interface IAuthParams {
    username: string;
    password: string;
    type: AuthMutation;
}

export const mutationAction = createAsyncThunk("auth/mutation", async(params: IAuthParams, thunkAPI) => {
    try {
        const {username,password,type} = params;
        const res = await AuthService.mutation(username,password,type);
        localStorage.setItem("access", res.data.accessToken);
        return res.data;
    } catch(e: any) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.response.data.message);
    }
})


export const logoutAction = createAsyncThunk("auth/logout", async(_, thunkAPI) => {
    try {
        const res = await AuthService.logout();
        localStorage.removeItem("access");
        return res.data;
    } catch(e: any) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.response.data.message);
    }
})

export const checkAuthAction = createAsyncThunk("auth/check", async(_, thunkAPI) => {
    try {
        const res = await AuthService.refresh();
        localStorage.setItem("access", res.data.accessToken);
        return res.data;
    } catch(e: any) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.response.data.message);
    }
})