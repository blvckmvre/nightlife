import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBarDetailed, IBarFetchParams, IBarsResponse, IBarUser } from "../../types/bars";

const baseUrl = process.env.REACT_APP_SERVER_URL+"/api";

export const barAPI = createApi({
    reducerPath: "barAPI",
    baseQuery: fetchBaseQuery({
        baseUrl, 
        credentials: "include", 
        prepareHeaders(headers) {
            const token = localStorage.getItem("access");
            if(token)
                headers.set("Authorization", "Bearer "+token);
            return headers;
        },
    }),
    tagTypes: ['users'],
    endpoints: build => ({
        getAll: build.query<IBarsResponse, IBarFetchParams>({
            query: (params) => ({
                url: "/bars",
                params
            }),
            providesTags: ['users']
        }),
        getDetails: build.query<IBarDetailed, string>({
            query: (bar_id) => ({
                url: "/details",
                params: {bar_id}
            }),
            providesTags: ['users']
        }),
        addUser: build.mutation<void, IBarUser>({
            query: (params) => ({
                url: "/add",
                method: "POST",
                body: params
            }),
            invalidatesTags: ['users']
        }),
        rmUser: build.mutation<void, IBarUser>({
            query: (params) => ({
                url: "/rm",
                method: "POST",
                body: params
            }),
            invalidatesTags: ['users']
        })
    })
})