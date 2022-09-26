import { HashLink } from 'react-router-hash-link'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { customClasses } from '../util/theme'
import { theme } from '../util/theme'
import { urls } from '../util/urls'
import logo from '../img/logTP.svg'
/** @jsxImportSource @emotion/react */

const style = {
  page: css({
    maxWidth: '100%',
    margin: '0',
    minheight: '100vh',
    height: '100vh',
    maxHeight: '100%',
    background: theme.colors.main_grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.colors.white,
    padding: '0 5rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      height: '100%',
      padding: '0',
    },
  }),
  logo: css({
    width: '4rem',
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '3rem',
      marginBottom: '1rem',
    },
  }),
  content: css({
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      flexDirection: 'column',
    },
  }),
  jsLogo: css({
    width: '15rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '10rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '7rem',
    },
  }),
  col1: css({
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 5rem',
  }),
  col2: css({
    width: '50%',
    textAlign: 'left',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '2rem 0 ',
      width: '80%',
      textAlign: 'center',
    },
  }),
  mainHeading: css({
    fontWeight: 'bolder',
    textTransform: 'uppercase',
    fontSize: '1.5rem',
    letterSpacing: '.3rem',
    margin: '0',
    color: theme.colors.white,
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      margin: '1rem 0',
    },
  }),
  reactText: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.5rem',
    color: theme.colors.reactBlue,
  }),
  text: css({
    marginTop: '2rem',
    fontWeight: 'light',
    fontSize: '.8rem',
    lineHeight: '1.2rem',
    letterSpacing: '.2rem',
    color: theme.colors.white,
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      margin: '2rem 0 5rem 0',
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
}

export const JSHistory = () => {
  return (
    <div css={style.page}>
      <Helmet>
        <title>Tomáš Pektor - Javascript History</title>
        <meta name='description' content='Statická stránka v Reactu' />
        <link rel='canonical' href='http://tomaspektor.cz/js-history' />
      </Helmet>
      <div css={style.topRow}>
        <HashLink to='/#portfolio' css={customClasses.tabletHidden}>
          <button css={style.backButton}>Back to Home Page</button>
        </HashLink>
        <img css={style.logo} src={logo} />
      </div>

      <div css={style.content}>
        <aside css={style.col1}>
          <img
            css={style.jsLogo}
            src='https://cdn.cdnlogo.com/logos/j/69/javascript.svg'
            alt='js_logo'
          ></img>
        </aside>
        <main css={style.col2}>
          <article>
            <h1 css={style.mainHeading}>A Brief History of JavaScript</h1>
            <span css={style.reactText}>Simple Static Page</span>
            <div css={style.text}>
              <p>
                JavaScript is a programming language that represents one of the three core languages
                used to develop websites, alongside HTML and CSS. Whereas HTML and CSS give a
                website structure and style, JavaScript lets you add functionality and behaviors to
                your website. This allows visitors to interact with your website in various creative
                ways.
              </p>
              <p>
                Mosaic was the first web browser with a graphical user interface. It was first
                released in 1993 and played a key role in the rapid development of the web as we
                know it today. The lead developers of Mosaic founded Netscape (now Mozilla) and
                released a more elegant browser called Netscape Navigator in 1994.
              </p>
              <p>
                During the early years of the web, web pages were only static, with no capability
                for dynamic behavior and interactivity. As a result, there was an urge in the web
                development community at the time to eliminate this limitation. This led Netscape to
                the decision to add a scripting language to the Navigator browser.
              </p>
              <p>
                In September 1995, a Netscape programmer named Brendan Eich developed a new
                scripting language in just 10 days. It was originally called Mocha, but quickly
                became known as LiveScript and, later, JavaScript.
              </p>
              <p>
                The language derived its syntax from Java, its first-class functions from Scheme,
                and its prototype-based inheritance from Self. Since then, JavaScript has been
                adopted by all major graphical web browsers.
              </p>
            </div>
          </article>
        </main>
        <HashLink to='/#portfolio' css={customClasses.desktopHidden}>
          <button css={style.backButton}>Back to Home Page</button>
        </HashLink>
      </div>
    </div>
  )
}
