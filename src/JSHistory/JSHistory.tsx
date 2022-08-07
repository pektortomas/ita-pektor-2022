import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from '../util/theme'
import { urls } from '../util/urls'
import React from 'react'
/** @jsxImportSource @emotion/react */

const style = {
  homeworkOne: css({
    minHeight: '100vh',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: theme.colors.lightReactBlue,
  }),

  homeworkContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '@media (max-width: 1280px)': {
      flexDirection: 'column',
      margin: '10vh 0',
      textAlign: 'center',
    },
  }),

  homeworkHeading: css({
    fontSize: theme.fontSizes.bigSize,
  }),
  homeworkMain: css({
    maxWidth: '50%',
    padding: '5%',
    background: theme.colors.whiteTransparent,
    boxShadow: theme.shadows.basicShadow,
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    borderRadius: '10px',
  }),
  homeworkAside: css({
    width: '30rem',
    textAlign: 'center',
  }),
  homeworkImg: css({
    width: '15rem',
    '@media (max-width: 1280px)': {
      width: '10rem',
      margin: '5vh 0',
    },
  }),
  homeworkBackToHomeLink: css({
    position: 'absolute',
    top: '3vh',
    left: '3vw',
    textDecoration: 'none',
  }),
}

export const JSHistory = () => {
  return (
    <div css={style.homeworkOne}>
      <Link css={style.homeworkBackToHomeLink} to={urls.home}>
        <span>Back to Home Page</span>
      </Link>
      <div css={style.homeworkContainer}>
        <aside css={style.homeworkAside}>
          <img
            css={style.homeworkImg}
            src='https://cdn.cdnlogo.com/logos/j/69/javascript.svg'
            alt='js_logo'
          ></img>
        </aside>
        <main css={style.homeworkMain}>
          <article>
            <h1 css={style.homeworkHeading}>A Brief History of JavaScript</h1>
            <p>
              JavaScript is a programming language that represents one of the three core languages
              used to develop websites, alongside HTML and CSS. Whereas HTML and CSS give a website
              structure and style, JavaScript lets you add functionality and behaviors to your
              website. This allows visitors to interact with your website in various creative ways.
            </p>
            <p>
              Mosaic was the first web browser with a graphical user interface. It was first
              released in 1993 and played a key role in the rapid development of the web as we know
              it today. The lead developers of Mosaic founded Netscape (now Mozilla) and released a
              more elegant browser called Netscape Navigator in 1994.
            </p>
            <p>
              During the early years of the web, web pages were only static, with no capability for
              dynamic behavior and interactivity. As a result, there was an urge in the web
              development community at the time to eliminate this limitation. This led Netscape to
              the decision to add a scripting language to the Navigator browser.
            </p>
            <p>
              In September 1995, a Netscape programmer named Brendan Eich developed a new scripting
              language in just 10 days. It was originally called Mocha, but quickly became known as
              LiveScript and, later, JavaScript.
            </p>
            <p>
              The language derived its syntax from Java, its first-class functions from Scheme, and
              its prototype-based inheritance from Self. Since then, JavaScript has been adopted by
              all major graphical web browsers.
            </p>
          </article>
        </main>
      </div>
    </div>
  )
}
