import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { barAPI } from "./reducers/barApi";

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [barAPI.reducerPath]: barAPI.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(barAPI.middleware)
    },
});


export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;


