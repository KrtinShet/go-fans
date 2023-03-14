import { apiSlice } from './apiSlice'

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComments: builder.query({
            query: (id) => `/comment/${id}`,
        }),
        createComment: builder.mutation({
            query: (body) => ({
                url: '/comment',
                method: 'POST',
                body,
            }),
        }),
        updateComment: builder.mutation({
            query: (body) => ({
                url: `/comment/${body.id}`,
                method: 'PATCH',
                body,
            }),
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/comment/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false,
})
