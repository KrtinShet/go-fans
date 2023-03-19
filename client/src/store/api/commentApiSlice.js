import { apiSlice } from './apiSlice'

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComment: builder.query({
            query: (id) => `/comment/${id}`,
            providesTags: (result, error, arg) => {
                const { comment } = result
                return [
                    {
                        type: 'COMMENT',
                        id: comment._id,
                    },
                    "COMMENT",
                ]
            },

        }),
        createComment: builder.mutation({
            query: (body) => ({
                url: '/comment',
                method: 'POST',
                body,
            }),
            invalidatesTags: () => {
                return ['COMMENT']
            },
            providesTags: (result, error, arg) => {
                const { comment } = result
                let tags = [
                    {
                        type: 'COMMENT',
                        id: comment._id,
                    },
                ]
                tags = [...tags, "COMMENT"];
                return tags
            }
        }),
        updateComment: builder.mutation({
            query: (body) => ({
                url: `/comment/${body.id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'COMMENT', id: arg.id }]
            },
            providesTags: (result, error, arg) => {
                const { comment } = result
                let tags = [
                    {
                        type: 'COMMENT',
                        id: comment._id,
                    },
                ]
                tags = [...tags, "COMMENT"];
                return tags
            }
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/comment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => {
                return ['COMMENT']
            },
        }),
        getPostComments: builder.query({
            query: (id) => `/comment/?feed=${id}`,
            providesTags: (result, error, arg) => {
                const { comments } = result
                let tags = comments.map((comment) => ({
                    type: 'COMMENT',
                    id: comment._id,
                }))
                tags = [...tags, "COMMENT"];
                return tags
            },
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetCommentQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useGetPostCommentsQuery,
} = commentApiSlice;
