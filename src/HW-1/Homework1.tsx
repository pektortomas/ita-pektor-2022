import { css, jsx } from '@emotion/react'
import React from 'react'
/** @jsxImportSource @emotion/react */

const homeworkOneStyles = css({
  height: '100vh',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: 'rgb(27, 27, 27)',
  h1: {
    fontSize: '2.5rem',
  },
  aside: {
    maxWidth: '33%',
    textAlign: 'center',
    img: {
      maxWidth: '50%',
    },
  },
  main: {
    maxWidth: '50%',
    color: 'white',
    padding: '5%',
    background: 'rgba(255, 255, 255, 0.21)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    borderRadius: '10px',
  },
  article: {
    width: '100%',
  },
})

export const Homework1 = () => {
  return (
    <>
      <div css={homeworkOneStyles}>
        <aside>
          <img src='https://cdn.cdnlogo.com/logos/j/69/javascript.svg' alt='js_logo'></img>
        </aside>
        <main>
          <article>
            <h1>A Brief History of JavaScript</h1>
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
    </>
  )
}
