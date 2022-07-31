import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import React from 'react'
import logo from '../logo.svg'
/** @jsxImportSource @emotion/react */

const HomeStyles = css({
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  textAlign: 'center',
  '& .header': {
    lineHeight: '.5rem',
  },
  '& .homeworkContainer': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  '& .homeworkList': {
    listStyle: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    li: {
      lineHeight: '.5rem',
      border: '1px solid rgba(25, 25, 25, 0.35)',
      borderRadius: '10px',
      padding: '5px 25px',
      margin: '0 10px',
      transition: 'all ease-in .2s',
      '&:hover': {
        color: 'white',
        backgroundColor: '#61DBFB',
        borderColor: 'rgba(255, 255, 255, 0.35)',
      },
    },
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
})

export const Home = () => {
  return (
    <div css={HomeStyles}>
      <div className='header'>
        <img src={logo} alt='react_logo' />
        <h1>Homeworks</h1>
        <h3>road to react-developer</h3>
      </div>
      <div className='homeworkContainer'>
        <h3>Click to view homework</h3>
        <ul className='homeworkList'>
          <Link to='/hw-1'>
            <li>
              <h4>Javascript History</h4>
              <p>Homework 1</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}
