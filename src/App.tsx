import './App.css'
import { Homework1 } from './HW-1/Homework1'
import React from 'react'
import logo from './logo.svg'

function App() {
  return (
    <>
      <div className='appContainer'>
        <div className='appHeader'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1>Homeworks</h1>
          <h3>road to react-developer</h3>
        </div>
        <div className='homeworkHeader'>
          <h2>Homework-1</h2>
          <img src='https://www.bocconisustainablefinance.com/wp-content/uploads/2021/01/down-arrow.gif' />
        </div>
      </div>
      <Homework1 />
    </>
  )
}

export default App
