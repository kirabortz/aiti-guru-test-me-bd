import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductsResponse } from "@/entities/product/product.types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      {
        skip: number;
        limit: number;
        q?: string;
        sortBy?: string;
        order?: string;
      }
    >({
      query: ({ skip, limit, q = "", sortBy = "", order = "asc" }) => {
        const params = new URLSearchParams({
          skip: skip.toString(),
          limit: limit.toString(),
          q,
          sortBy,
          order,
        });
        return `/api/products?${params}`;
      },
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
