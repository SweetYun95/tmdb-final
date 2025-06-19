import { createSlice, createAsyncThnuk, combineSlices } from '@reduxjs/toolkit'
import { getMovies } from '../api/tmdbApi'

export const fetchMovies = createAsyncThnuk('movies/fetchMovies', async ({ category, page }) => {
   const response = await getMovies(category, page)
   console.log(response)
   return response.data.results
})

const movieSlice = createSlice({
   name: 'movies',
   initialState: {
      movies: [], // 현재상영 || 개봉예정 || 인기영화 목록
      loading: false, // 로딩여부
      error: null, // 에러메시지
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchMovies.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false
            state.movies = action.payload
         })
         .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default movieSlice.reducer
