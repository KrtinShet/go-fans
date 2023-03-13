import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let baseUrl = "http://localhost:5000/api/v1";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [
        // "Mint", 
        // "Stake", 
        // "P2P",
    ],
    endpoints: (builder) => ({}),
});
