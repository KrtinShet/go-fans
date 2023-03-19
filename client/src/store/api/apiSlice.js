import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let baseUrl = "/api/v1";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    tagTypes: [
        "CREATOR",
        "COMMENT",
        "FEEDS",
        "PAYMENTS",
    ],
    endpoints: (builder) => ({}),
});
