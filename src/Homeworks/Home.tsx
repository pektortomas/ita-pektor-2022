import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from '../Utils/theme'
import { urls } from '../Utils/urls'
import logo from '../logo.svg'
/** @jsxImportSource @emotion/react */

const LinkStyle = css({
  color: 'inherit',
  textDecoration: 'none',
})

const HomeStyle = css({
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  textAlign: 'center',
})

const HeaderStyle = css({
  lineHeight: '.5rem',
})

const HomeworkContainerStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
})

const HomeworkListStyle = css({
  listStyle: 'none',
  padding: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const HomeworkListItemStyle = css({
  lineHeight: '.5rem',
  border: '1px solid',
  borderColor: theme.colors.darkGrey,
  borderRadius: '10px',
  padding: '5px 25px',
  margin: '0 10px',
  transition: theme.transitions.basicEaseIn,
  '&:hover': {
    color: theme.colors.white,
    backgroundColor: theme.colors.reactBlue,
    borderColor: theme.colors.white,
  },
})

export const Home = () => {
  return (
    <div css={HomeStyle}>
      <div css={HeaderStyle}>
        <img src={logo} alt='react_logo' />
        <h1>Homeworks</h1>
        <h3>road to react-developer</h3>
      </div>
      <div css={HomeworkContainerStyle}>
        <h3>Click to view homework</h3>
        <ul css={HomeworkListStyle}>
          <Link css={LinkStyle} to={urls.hwOne}>
            <li css={HomeworkListItemStyle}>
              <h4>Javascript History</h4>
              <p>Homework 1</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}
