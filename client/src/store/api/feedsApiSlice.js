import { apiSlice } from './apiSlice'

export const feedsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFeeds: builder.query({
            query: () => '/feed',
        }),
        getFeed: builder.query({
            query: (id) => `/feed/${id}`,
        }),
        createFeed: builder.mutation({
            query: (body) => ({
                url: '/feed',
                method: 'POST',
                body,
            }),
        }),
        updateFeed: builder.mutation({
            query: (body) => ({
                url: `/feed/${body.id}`,
                method: 'PATCH',
                body,
            }),
        }),
        deleteFeed: builder.mutation({
            query: (id) => ({
                url: `/feed/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false,
})


export const {
    useGetFeedsQuery,
    useGetFeedQuery,
    useCreateFeedMutation,
    useUpdateFeedMutation,
    useDeleteFeedMutation,
} = feedsApiSlice
