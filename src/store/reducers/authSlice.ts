import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../types/auth";
import { checkAuthAction, logoutAction, mutationAction } from "../action-creators/auth";

interface IAuthState {
    isLoading: boolean;
    error: string | null;
    isLoggedIn: boolean;
    userData: IUserData | null;
    usernameInput: string;
    passwordInput: string;
}

const initialState: IAuthState = {
    isLoading: false,
    error: null,
    isLoggedIn: false,
    userData: null,
    usernameInput: "",
    passwordInput: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state,action: PayloadAction<string>) => {
            state.usernameInput = action.payload;
        },
        setPassword: (state,action: PayloadAction<string>) => {
            state.passwordInput = action.payload;
        }
    },
    extraReducers: {
        [mutationAction.pending.type]: (state) => {
            state.isLoading = true;
            state.usernameInput = "";
            state.passwordInput = "";
        },
        [mutationAction.fulfilled.type]: (state,action: PayloadAction<IUserData>) => {
            state.isLoading = false;
            state.error = null;
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        [mutationAction.rejected.type]: (state,action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isLoggedIn = false;
        },

        [logoutAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logoutAction.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = null;
            state.isLoggedIn = false;
            state.userData = null;
        },
        [logoutAction.rejected.type]: (state,action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [checkAuthAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [checkAuthAction.fulfilled.type]: (state,action: PayloadAction<IUserData>) => {
            state.isLoading = false;
            state.error = null;
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        [checkAuthAction.rejected.type]: (state,action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isLoggedIn = false;
        },
    }
})