import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: () => {
                console.log("Invalidating all tags");
                return ['FEEDS', "CREATOR", 'COMMENTS', 'PAYMENTS'];
            }
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/auth/signup',
                method: 'POST',
                body,
            }),
        }),
        creatorLogin: builder.mutation({
            query: (body) => ({
                url: '/auth/creator/login',
                method: 'POST',
                body,
            }),
        }),
        creatorRegister: builder.mutation({
            query: (body) => ({
                url: '/auth/creator/signup',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET',
            }),
        }),
        getMe: builder.query({
            query: () => '/auth/me',
        }),
    }),
    overrideExisting: false,
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetMeQuery,
    useCreatorLoginMutation,
    useCreatorRegisterMutation,
    useLogoutMutation
} = authApiSlice

