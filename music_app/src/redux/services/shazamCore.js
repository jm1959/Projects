import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const shazamCoreApi = createApi({
    reducerPath: "shazamCoreApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://shazam-core7.p.rapidapi.com",
        prepareHeaders: (headers) => {
          headers.set("X-RapidAPI-Key","d7898c86efmsh3194791de516acfp1655b8jsna7621f63305c");

          return headers;
        },
    }),
    endpoints: (builder) => ({
      getTopCharts: builder.query({ query: () => '/charts/get-top-songs-in-world'})
    })
  });

  export const {
    useGetTopChartsQuery,
  } = shazamCoreApi;