// 영화상세페이지

import { Main, Wrap } from '../styles/StyledComponents'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

// import { useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'

function Detail() {
   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">영화상세페이지</Main>
         <Footer />
      </Wrap>
   )
}

export default Detail
