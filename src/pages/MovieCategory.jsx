// 인기영화, 현재 상영중, 개봉예정 페이지
import { Wrap, Main, Loading } from '../styles/StyledComponents'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import Button from '@mui/material/Button'

import { fetchMovies } from '../features/movieSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function MovieCategory({ category }) {
   const dispatch = useDispatch()
   const { movies, loading, error } = useSelector((state) => state.movies)

   // 카테고리 별 페이지 번호
   const [page, setPage] = useState({
      popular: 1,
      now_playing: 1,
      upcoming: 1,
   })

   // category || page가 바뀔때 동작한다.
   useEffect(() => {
      // category를 props로 받아와서 다른 category 전달
      dispatch(fetchMovies({ category, page: page[category] }))
   }, [dispatch, category, page])

   // 더보기 버튼 클릭시 실행
   const loadMore = () => {
      setPage((prevState) => ({ ...prevState, [category]: prevState[category] + 1 }))
   }

   // 페이지 번호가 1번일때만 loading 실행 -> 더보기 버튼 클릭시 로딩 컴포넌트가 렌더링되면 위로 올라오는 현상 방지
   if (loading && page[category]===1) {
      return (
         <Wrap>
            <Menu />
            <Main>
               <Loading />
            </Main>
            <Footer />
         </Wrap>
      )
   }
   if (error) {
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>Error:{error}</h2>
            </Main>
            <Footer />
         </Wrap>
      )
   }

   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">
            <MovieCard movies={movies} />
            <Button
               variant="outlined"
               sx={{
                  margin: '20px auto',
                  display: 'block',
                  width: '500px',
               }}
               onClick={loadMore}
            >
               더보기
            </Button>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default MovieCategory
