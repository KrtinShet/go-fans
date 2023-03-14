import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let baseUrl = "http://localhost:5000/api/v1";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    tagTypes: [],
    endpoints: (builder) => ({}),
});
