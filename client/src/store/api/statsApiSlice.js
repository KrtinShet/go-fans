import { apiSlice } from './apiSlice'

const statsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        top5Creators: builder.query({
            query: () => '/stats/top-5-creators',
        }),
        top3Users: builder.query({
            query: () => '/stats/top-3-users',
        }),
        avgPaymentTop3Users: builder.query({
            query: () => '/stats/average-payments-by-top-3-users',
        }),
    }),
    overrideExisting: false,
});


export const {
    useTop5CreatorsQuery,
    useAvgPaymentTop3UsersQuery,
    useTop3UsersQuery
} = statsApiSlice;