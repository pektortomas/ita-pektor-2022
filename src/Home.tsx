import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from './util/theme'
import { urls } from './util/urls'
import logo from './logo.svg'
/** @jsxImportSource @emotion/react */

const style = {
  link: css({
    color: 'inherit',
    textDecoration: 'none',
  }),
  home: css({
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
  }),
  header: css({
    lineHeight: '.5rem',
  }),
  homeworkContainer: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  }),
  homeworkList: css({
    listStyle: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  homeworkListItem: css({
    lineHeight: '.5rem',
    width: '10rem',
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
  }),
}

export const Home = () => {
  return (
    <div css={style.home}>
      <div css={style.header}>
        <img src={logo} alt='react_logo' />
        <h1>Homeworks</h1>
        <h3>road to react-developer</h3>
      </div>
      <div css={style.homeworkContainer}>
        <h3>Click to view homework</h3>
        <ul css={style.homeworkList}>
          <Link css={style.link} to={urls.jsHistory}>
            <li css={style.homeworkListItem}>
              <h4>Javascript History</h4>
              <p>Homework 1</p>
            </li>
          </Link>
          <Link css={style.link} to={urls.counterApp}>
            <li css={style.homeworkListItem}>
              <h4>Counter in class</h4>
              <p>Homework 2</p>
            </li>
          </Link>
          <Link css={style.link} to={urls.hackerTyper}>
            <li css={style.homeworkListItem}>
              <h4>Hacker Typer</h4>
              <p>Homework 3</p>
            </li>
          </Link>
          <Link css={style.link} to={urls.todoApp}>
            <li css={style.homeworkListItem}>
              <h4>Todo App</h4>
              <p>Homework 3-B</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}
