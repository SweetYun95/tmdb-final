import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MovieCategory from './pages/MovieCategory'
import SearchResults from './pages/SearchResults'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />

         {/* 
         💖 라우터에서 같은 컴포넌트로 여러 경로로 갈때 주의점 💖

         최초로 메뉴를 클릭시 MovieCategory 컴포넌트를 마운트 하고
         다른메뉴 클릭시 MovieCategory 새로 마운트하는게 아닌 재랜더링한다.         
         문제는 category가 변해도(재렌더링)page state 값은 그대로 유지가 된다.
         즉 새로운 메뉴를 클릭 시 해당 페이지 번호가 1이 아님!

         => key props 사용시 재랜더링을 하는게 아니라 언마운트후 다시 마운트를 강제로 발생시킨다.

         category props 상관없이 key props만 지정해도 언마운트 후 마운트 됨
         key가 라우터에서 컴포넌트를 구분하기 위한 props
         MovieCategory를 하나의 컴포넌트로 보지 않고 각각 다른 컴포넌트로 인식하게 함
         */}
         <Route path="/popular" element={<MovieCategory category="popular" key="popular" />} />
         <Route path="/now_playing" element={<MovieCategory category="now_playing" key="now_playing" />} />
         <Route path="/upcoming" element={<MovieCategory category="upcoming" key="upcoming" />} />

         <Route path="/search" element={<SearchResults />} />
         <Route path="/detail/:movieId" element={<Detail />} />
         <Route path="/*" element={<NotFound />} />
      </Routes>
   )
}

export default App
