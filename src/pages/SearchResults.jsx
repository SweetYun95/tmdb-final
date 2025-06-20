// 검색결과 페이지
import { Button, Loading, Main, Wrap } from '../styles/StyledComponents'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSearchResults } from '../features/movieSlice'
import MovieCard from '../components/MovieCard'
import { useSearchParams } from 'react-router-dom'

function SearchResults() {
   const [searchParams] = useSearchParams()
   const query = searchParams.get('query')

   const [page, setPage] = useState(1) // 페이지 번호
   const dispatch = useDispatch()
   const { searchResults, loading, error } = useSelector((state) => state.movies)

   useEffect(() => {
      dispatch(fetchSearchResults({ query, page }))
   }, [dispatch, query, page])

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
            {/* 검색결과가 없을 때 */}
            {searchResults.length > 0 ? (
               <>
                  <MovieCard movies={searchResults} />
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
               </>
            ) : (
               <h2>검색 결과가 없습니다.</h2>
            )}
         </Main>
         <Footer />
      </Wrap>
   )
}

export default SearchResults
