import { HashLink } from 'react-router-hash-link'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { customClasses, theme } from '../util/theme'
import { sourceCode } from './sourceCode'
import { urls } from '../util/urls'
import { useState } from 'react'
import logo from '../img/logTP.svg'
import styled from '@emotion/styled'
/** @jsxImportSource @emotion/react */

const StyledBackButton = styled.button({
  background: theme.colors.reactBlueDark,
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
  [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
    margin: '2rem 0',
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '0 1rem',
      textAlign: 'center',
      alignItems: 'center',
    },
  }),
  logo: css({
    width: '4rem',
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '3rem',
      marginBottom: '1rem',
    },
  }),
  mainHeading: css({
    fontWeight: 'bolder',
    textTransform: 'uppercase',
    fontSize: '1.5rem',
    letterSpacing: '.3rem',
    margin: '0',
  }),
  backButton: css({
    background: theme.colors.reactBlueDark,
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      marginTop: '1rem',
      width: '90%',
      textAlign: 'center',
    },
  }),
  topRow: css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '3rem 0',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '2rem 0',
      justifyContent: 'center',
    },
  }),
  reactText: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.5rem',
    color: theme.colors.reactBlue,
  }),
  hackerConsole: css({
    height: '100%',
    border: 'none',
    borderRadius: '10px',
    outline: 'none',
    padding: '2rem',
    color: theme.colors.reactBlue,
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.in,
    resize: 'none',
  }),
  heading: css({
    margin: '1rem 0',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      marginBottom: '2rem',
    },
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
        <HashLink to='/#portfolio' css={customClasses.tabletHidden}>
          <StyledBackButton>Back to Home Page</StyledBackButton>
        </HashLink>
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
      <HashLink to='/#portfolio' css={customClasses.desktopHidden}>
        <StyledBackButton>Back to Home Page</StyledBackButton>
      </HashLink>
    </div>
  )
}
