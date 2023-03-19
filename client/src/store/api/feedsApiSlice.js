import { apiSlice } from './apiSlice'

export const feedsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFeeds: builder.query({
            query: () => '/feed',
            providesTags: (result, error, arg) => {
                if (result) {
                    const { feeds } = result;
                    let tags = [...feeds.map((feed) => ({
                        type: "FEEDS",
                        id: feed._id,
                    })), "FEEDS"];
                    return tags;
                }
            }
        }),
        getFeed: builder.query({
            query: (id) => `/feed/${id}`,
            providesTags: (result, error, arg) => {
                if (result) {
                    const { feed } = result
                    let tags = [
                        {
                            type: 'FEEDS',
                            id: feed._id,
                        },
                    ]
                    return tags
                }
            },
        }),
        createFeed: builder.mutation({
            query: (body) => ({
                url: '/feed',
                method: 'POST',
                body,
            }),
            providesTags: (result, error, arg) => {
                const { feed } = result
                let tags = [
                    {
                        type: 'FEEDS',
                        id: feed._id,
                    },
                ]
                tags = [...tags, "FEEDS"];
                return tags
            }
        }),
        updateFeed: builder.mutation({
            query: (body) => ({
                url: `/feed/${body.id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'FEEDS', id: arg.id }]
            },
            providesTags: (result, error, arg) => {
                const { feed } = result
                let tags = [
                    {
                        type: 'FEEDS',
                        id: feed._id,
                    },
                ]
                tags = [...tags, "FEEDS"];
                return tags
            }
        }),
        deleteFeed: builder.mutation({
            query: (id) => ({
                url: `/feed/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => {
                return ['FEEDS']
            }
        }),
        likeFeed: builder.mutation({
            query: (id) => ({
                url: `/feed/like/${id}`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'FEEDS', id: arg }]
            },
            providesTags: (result, error, arg) => {
                const { feed } = result
                let tags = [
                    {
                        type: 'FEEDS',
                        id: feed._id,
                    },
                ]
                tags = [...tags, "FEEDS"];
                return tags
            }
        }),
        unlikeFeed: builder.mutation({
            query: (id) => ({
                url: `/feed/unlike/${id}`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'FEEDS', id: arg }]
            },
            providesTags: (result, error, arg) => {
                const { feed } = result
                let tags = [
                    {
                        type: 'FEEDS',
                        id: feed._id,
                    },
                ]
                tags = [...tags, "FEEDS"];
                return tags
            }
        }),
        getAllCreatorFeeds: builder.query({
            query: (id) => `/feed/creator/${id}`,
            providesTags: (result, error, arg) => {
                if (result) {
                    const { feeds } = result;
                    let tags = [...feeds.map((feed) => ({
                        type: "FEEDS",
                        id: feed._id,
                    })), "FEEDS"];

                    return tags
                }
            },
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
    useLikeFeedMutation,
    useUnlikeFeedMutation,
    useGetAllCreatorFeedsQuery,
} = feedsApiSlice
