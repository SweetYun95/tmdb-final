// 검색결과 페이지
import { Button, Loading, Main, Wrap } from '../styles/StyledComponents'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSearcResults } from '../features/movieSlice'
import MovieCard from '../components/MovieCard'

function SearchResults() {
   const [page, setPage] = useState(1) // 페이지 번호
   const dispatch = useDispatch()
   const { SearchResults, loading, error } = useSelector((state) => state.movies)

   useEffect(() => {
      dispatch(fetchSearcResults({ query: '안녕', page }))
   }, [dispatch, page])

   // 더보기 버튼 클릭시 실행
   const loadMore = () => {
      setPage((prevState) => prevState + 1)
   }

   if (loading && page === 1) {
      return (
         <Wrap>
            <Menu />
            <Main $padding="30px 0">
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
            <Main $padding="30px 0">
               <h2>오류발생: {error}</h2>
            </Main>
            <Footer />
         </Wrap>
      )
   }

   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">
            <MovieCard movies={SearchResults} />
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

export default SearchResults
