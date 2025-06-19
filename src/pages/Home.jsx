// 메인페이지

import { Main, Wrap } from '../styles/StyledComponents'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

function Home() {
   return (
      <Wrap>
         <Menu />
         <Main>메인페이지</Main>
         <Footer />
      </Wrap>
   )
}

export default Home
