import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/'}),
    tagTypes: ['Pizza'],
    endpoints: build => ({
        getPizzaOrders: build.query({
            query: () => 'history',
            providesTags: ['Pizza']
        }),
        createPizzaOrder: build.mutation({
            query: order => ({
                url: 'order',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['Pizza']
        })
    })
})

export const {
    useGetPizzaOrdersQuery,
    useCreatePizzaOrderMutation,
} = pizzaApi