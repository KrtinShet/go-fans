import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
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
        logout: builder.query({
            query: () => '/auth/logout',
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
    useLogoutMutation,
    useGetMeQuery,
    useCreatorLoginMutation,
    useCreatorRegisterMutation
} = authApiSlice

