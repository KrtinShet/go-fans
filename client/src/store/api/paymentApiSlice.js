import { apiSlice } from './apiSlice'

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (body) => ({
                url: '/payment',
                method: 'POST',
                body,
            }),
        }),
        getSubscription: builder.query({
            query: () => '/payment',
        }),
    }),
    overrideExisting: false,
})

export const {
    useCreatePaymentMutation,
    useGetSubscriptionQuery,
} = paymentApiSlice
