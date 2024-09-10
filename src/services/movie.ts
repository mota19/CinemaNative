import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, MovieSearchResponse } from "../types/movieType";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://www.omdbapi.com/",
  }),
  endpoints: (builder) => ({
    getMovie: builder.query<
      MovieSearchResponse,
      { title: string; page: number }
    >({
      query: ({ title, page }) => `?s=${title}&page=${page}&apikey=9d69160a`,
    }),
    getDescriptionOfMovie: builder.query<Movie, { movieID: string }>({
      query: ({ movieID }) => `?i=${movieID}&plot=short&apikey=9d69160a`,
    }),
  }),
});

export const { useGetMovieQuery, useGetDescriptionOfMovieQuery } = movieApi;
