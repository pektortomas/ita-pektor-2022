import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { sourceCode } from './sourceCode'
import { theme } from '../util/theme'
import { urls } from '../util/urls'
import { useState } from 'react'
import logo from '../img/logTP.svg'
import styled from '@emotion/styled'
/** @jsxImportSource @emotion/react */

const StyledBackButton = styled.button({
  background: theme.colors.react_blue_dark,
  border: 'none',
  width: '12rem',
  height: '3rem',
  fontSize: '0.6rem',
  textTransform: 'uppercase',
  borderRadius: '8px',
  color: theme.colors.white,
  fontWeight: 'bolder',
  letterSpacing: '.1rem',
  cursor: 'pointer',
  '&:hover': {
    filter: theme.glows.reactGlowSVG,
  },
})
const StyledMainHeading = styled.h1({
  fontWeight: 'bolder',
  textTransform: 'uppercase',
  fontSize: '1.5rem',
  letterSpacing: '.3rem',
  margin: '0',
})

const style = {
  page: css({
    maxWidth: '100%',
    margin: '0',
    padding: '0 5rem',
    height: '100vh',
    maxHeight: '100vh',
    background: theme.colors.main_grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: theme.colors.white,
  }),
  logo: css({
    width: '4rem',
  }),
  mainHeading: css({
    fontWeight: 'bolder',
    textTransform: 'uppercase',
    fontSize: '1.5rem',
    letterSpacing: '.3rem',
    margin: '0',
  }),
  backButton: css({
    background: theme.colors.react_blue_dark,
    border: 'none',
    width: '12rem',
    height: '3rem',
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    borderRadius: '8px',
    color: theme.colors.white,
    fontWeight: 'bolder',
    letterSpacing: '.1rem',
    cursor: 'pointer',
    '&:hover': {
      filter: theme.glows.reactGlowSVG,
    },
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'left',
    height: '60%',
    marginTop: '5rem',
  }),
  topRow: css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5rem 0',
  }),
  reactText: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.5rem',
    color: theme.colors.react_blue,
  }),
  hackerConsole: css({
    height: '100%',
    border: 'none',
    borderRadius: '10px',
    outline: 'none',
    padding: '2rem',
    color: theme.colors.react_blue,
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.in,
    resize: 'none',
  }),
  heading: css({
    margin: '1rem 0',
  }),
}
export const HackerTyper = () => {
  const [pressCount, setPressCount] = useState(0)

  return (
    <div css={style.page}>
      <Helmet>
        <title>Tomáš Pektor - Hacker Typer</title>
        <meta name='description' content='Jednoduchá React aplikace ve formě function komponenty' />
        <link rel='canonical' href='http://tomaspektor.cz/hacker-typer' />
      </Helmet>
      <div css={style.topRow}>
        <Link to={urls.home}>
          <StyledBackButton>Back to Home Page</StyledBackButton>
        </Link>
        <img css={style.logo} src={logo} />
      </div>
      <div css={style.content}>
        <div css={style.heading}>
          <StyledMainHeading>Hacker Typer</StyledMainHeading>
          <span css={style.reactText}>make yourself hacker</span>
        </div>
        <textarea
          css={style.hackerConsole}
          autoFocus
          spellCheck={false}
          value={pressCount === 0 ? 'Start typing...' : sourceCode.slice(0, pressCount)}
          onChange={() => setPressCount(pressCount > sourceCode.length ? 0 : pressCount + 3)}
        />
      </div>
    </div>
  )
}
