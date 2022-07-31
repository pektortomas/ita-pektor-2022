import { Global, css, jsx } from '@emotion/react'
import { Home } from './Homeworks/Home'
import { Homework1 } from './Homeworks/HW-1/Homework1'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
/** @jsxImportSource @emotion/react */

const GlobalStyles = css({
  '& *': {
    fontFamily: 'sans-serif',
  },
  body: {
    margin: '0px',
  },
})

function App() {
  return (
    <Router>
      <Global styles={GlobalStyles} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hw-1' element={<Homework1 />} />
      </Routes>
    </Router>
  )
}

export default App
