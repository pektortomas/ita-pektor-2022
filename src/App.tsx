import { Counter } from './Counter/Counter'
import { Global, css, jsx } from '@emotion/react'
import { HackerTyper } from './HackerTyper/HackerTyper'
import { Home } from './Home'
import { JSHistory } from './JSHistory/JSHistory'
import { MemoryGame } from './MemoryGame/MemoryGame'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { TodoApp } from './TodoApp/TodoApp'
import { theme } from './util/theme'
import { urls } from './util/urls'
import MortgageCalculator from './MortgageCalculator/MortgageCalculator'
/** @jsxImportSource @emotion/react */

const GlobalStyles = css({
  '& *': {
    fontFamily: 'sans-serif',
    color: theme.colors.darkGrey,
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
        <Route path={urls.jsHistory} element={<JSHistory />} />
        <Route path={urls.counterApp} element={<Counter />} />
        <Route path={urls.hackerTyper} element={<HackerTyper />} />
        <Route path={urls.todoApp} element={<TodoApp />} />
        <Route path={urls.memoryGame} element={<MemoryGame />} />
        <Route path={urls.mortgageCalculator} element={<MortgageCalculator />} />
      </Routes>
    </Router>
  )
}

export default App
