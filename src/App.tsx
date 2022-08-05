import { Global, css, jsx } from '@emotion/react'
import { HackerTyper } from './Homeworks/HW-3/HackerTyper/HackerTyper'
import { Home } from './Homeworks/Home'
import { Homework1 } from './Homeworks/HW-1/JSHistory'
import { Homework2 } from './Homeworks/HW-2/Homework2'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { TodoApp } from './Homeworks/HW-3/TodoApp/TodoApp'
import { urls } from './Utils/urls'
/** @jsxImportSource @emotion/react */

const GlobalStyles = css({
  '& *': {
    fontFamily: 'sans-serif',
  },
  body: {
    margin: '0px',
    padding: '0px',
    boxSizing: 'border-box',
  },
})

function App() {
  return (
    <Router>
      <Global styles={GlobalStyles} />
      <Routes>
        <Route path={urls.home} element={<Home />} />
        <Route path={urls.hwOne} element={<Homework1 />} />
        <Route path={urls.hwTwo} element={<Homework2 />} />
        <Route path={urls.hwThree} element={<HackerTyper />} />
        <Route path={urls.hwThreeB} element={<TodoApp />} />
      </Routes>
    </Router>
  )
}

export default App
