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
         최초로 메뉴를 클릭시 MovieCategory 컴포넌트를 마운트 한 이후 다른메뉴 클릭시
         MovieCategory 컴포넌트를 재랜더링 하지 않는 경우가 있다. (라우터를 사용한 경우 같은 컴포넌트 사용시 props가 바뀌어도 재랜더링이 되지 않음)
         => category props가 바뀔때 재렌더링이 일어나게 하기 위해 key props 사용
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
