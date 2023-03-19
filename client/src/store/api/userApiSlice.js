import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubscribedCreators: builder.query({
            query: () => `subscription?fields=creator`,
            providesTags: (result, error, arg) => {
                if (result) {
                    const { subscriptions } = result
                    let tags = [...subscriptions.map((subscription) => ({
                        type: 'CREATOR',
                        id: subscription._id,
                    }))];
                    tags = [...tags, "CREATOR"];
                    return tags;
                }
            },
        }),

        getCreatorDetails: builder.query({
            query: (creatorId) => `user/${creatorId}`,
            providesTags: (result, error, arg) => {
                if (result) {
                    const { user } = result
                    return [
                        {
                            type: 'CREATOR',
                            id: user._id,
                        },
                        "CREATOR",
                    ]
                }
            }
        }),

        getSubscribers: builder.query({
            query: (creatorId) => `subscription/s/?fields=subscriber&creator=${creatorId}`,
            providesTags: (result, error, arg) => {
                if (result) {
                    const { subscriptions } = result
                    let tags = [...subscriptions.map((subscription) => ({
                        type: 'SUBSCRIBER',
                        id: subscription._id,
                    }))];
                    tags = [...tags, "SUBSCRIBER"];
                    return tags;
                }
            },
        }),

        getAllCreators: builder.query({
            query: () => `user?role=publisher`,
            providesTags: (result, error, arg) => {
                if (result) {
                    const { users } = result
                    let tags = [...users.map((user) => ({
                        type: 'CREATOR',
                        id: user._id,
                    }))];
                    tags = [...tags, "CREATOR"];
                    return tags;
                }
            },
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetSubscribedCreatorsQuery,
    useGetCreatorDetailsQuery,
    useGetSubscribersQuery,
    useGetAllCreatorsQuery
} = userApiSlice
