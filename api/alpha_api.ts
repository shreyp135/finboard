import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const alphaApi = createApi({
    reducerPath: "alphaApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.alphavantage.co/query",
    }),
    endpoints: (builder) => ({
        getStock: builder.query<any,string>({
            query: (symbol: string) => `query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
        }),
    }), 
});


export const { useGetStockQuery } = alphaApi;