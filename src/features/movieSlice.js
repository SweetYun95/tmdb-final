import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies, getMovieDetails, getMovieCredits } from '../api/tmdbApi'

// 현재상영 || 개봉예정 || 인기영화 목록
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ category, page }) => {
   // category = 'popular', page = 1
   const response = await getMovies(category, page)
   return response.data.results // 배열데이터
})

// 영화 상세정보
export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (movieId) => {
   const response = await getMovieDetails(movieId)
   return response.data // JSON
})

// 출연배우 정보
export const fetchMovieCredits = createAsyncThunk('movies/fetchMovieCredits', async (movieId) => {
   const response = await getMovieCredits(movieId)
   return response.data //영화의 배우와 스텝 객체 데이터
})

const movieSlice = createSlice({
   name: 'movies',
   initialState: {
      movies: [], // 현재상영 || 개봉예정 || 인기영화 목록
      movieDetails: null, // 영화 상세 정보
      movieCredits: null, // 출연배우 정보
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

            // action.meta.arg에서는 fetch 함수에서 매개변수로 받아온 값을 가져올 수 있음
            // 페이지가 1페이지 일때는 새로운 state로 업데이트
            if (action.meta.arg.page === 1) {
               state.movies = action.payload
            } else {
               // 페이지가 2페이지 이상일때는 기존에 새로운 데이터 추가한 state 업데이트
               state.movies = [...state.movies, ...action.payload] // 기존 영화에 새 영화 추가
            }
         })
         .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         // 영화 상세정보
         .addCase(fetchMovieDetails.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.loading = false
            state.movieDetails = action.payload
         })
         .addCase(fetchMovieDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         // 출연배우 정보
         .addCase(fetchMovieCredits.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchMovieCredits.fulfilled, (state, action) => {
            state.loading = false
            state.movieCredits = action.payload
         })
         .addCase(fetchMovieCredits.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default movieSlice.reducer
