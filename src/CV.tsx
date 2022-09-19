import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from './util/theme'
import { urls } from './util/urls'
import avatar from './img/avatar.png'
import logo from './img/logTP.svg'
/** @jsxImportSource @emotion/react */

const style = {
  page: css({
    maxWidth: '100%',
    margin: '0',
    minHeight: '100vh',
    height: '100%',
    maxHeight: '100%',
    background: theme.colors.main_grey,
    display: 'flex',
    flexDirection: 'column',
    color: theme.colors.white,
    padding: '0 5rem',
  }),
  logo: css({
    width: '4rem',
  }),
  content: css({
    display: 'flex',
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5rem',
  }),
  jsLogo: css({
    width: '15rem',
  }),
  col2: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  mainHeading: css({
    fontWeight: 'bolder',
    textTransform: 'uppercase',
    fontSize: '1.5rem',
    letterSpacing: '.3rem',
    margin: '0',
    color: theme.colors.white,
  }),
  smallHeading: css({
    fontWeight: 'bolder',
    textTransform: 'uppercase',
    fontSize: '1.1rem',
    letterSpacing: '.3rem',
    margin: '0',
    color: theme.colors.white,
    marginBottom: '1rem',
  }),
  reactText: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.5rem',
    color: theme.colors.reactBlue,
  }),
  reactTextSmall: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.5rem',
    letterSpacing: '.5rem',
    color: theme.colors.reactBlue,
  }),
  text: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
    marginTop: '2rem',
    fontWeight: 'light',
    fontSize: '.8rem',
    lineHeight: '1.2rem',
    letterSpacing: '.2rem',
    color: theme.colors.white,
  }),
  textBlock: css({
    marginBottom: '2rem',
  }),
  smallText: css({
    fontSize: '.7rem',
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
  topRow: css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5rem 0',
  }),
}

export const CV = () => {
  return (
    <div css={style.page}>
      <Helmet>
        <title>Tomáš Pektor - Javascript History</title>
        <meta name='description' content='Statická stránka v Reactu' />
        <link rel='canonical' href='http://tomaspektor.cz/js-history' />
      </Helmet>
      <div css={style.topRow}>
        <Link to={urls.home}>
          <button css={style.backButton}>Back to Home Page</button>
        </Link>
        <img css={style.logo} src={logo} />
      </div>

      <div css={style.content}>
        <main css={style.col2}>
          <h1 css={style.mainHeading}>Tomáš Pektor</h1>
          <span css={style.reactText}>React developer</span>
          <article>
            <div css={style.text}>
              <img css={style.jsLogo} src={avatar}></img>¨
              <div css={style.textBlock}>
                <h3 css={style.smallHeading}>Tech Stack</h3>
                <p css={style.reactText}>REACT.JS</p>
                <p css={style.reactText}>JAVASCRIPT</p>
                <p css={style.reactText}>TYPESCRIPT</p>
                <p css={style.reactText}>NODE.JS</p>
                <p css={style.reactText}>CSS</p>
                <p css={style.reactText}>HTML</p>
              </div>
              <div css={style.textBlock}>
                <h3 css={style.smallHeading}>Education</h3>
                <p css={style.smallText}>2009-2013</p>
                <p css={style.reactText}>SOŠE,COP HLUBOKÁ NAD VLTAVOU</p>
                <p>IT AND NETWORKS</p>
              </div>
              <div css={style.textBlock}>
                <h3 css={style.smallHeading}>Courses</h3>
                <p css={style.smallText}>2022</p>
                <p css={style.reactText}>SMARTBRAINS IT ABSOLVENT</p>
                <p>FRONTEND REACTDEVELOPMENT IN TYPESCRIPT</p>
              </div>
              <div css={style.textBlock}>
                <h3 css={style.smallHeading}>Languages</h3>
                <p css={style.smallText}>Native</p>
                <p css={style.reactText}>CZECH</p>
                <p css={style.smallText}>B2</p>
                <p css={style.reactText}>ENGLISH</p>
                <p css={style.smallText}>A2</p>
                <p css={style.reactText}>GERMAN</p>
              </div>
              <a href={urls.cvDownload}>
                <button css={style.backButton}>Download in PDF</button>
              </a>
            </div>
          </article>
        </main>
      </div>
    </div>
  )
}
