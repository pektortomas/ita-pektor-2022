import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { ReactComponent as ReactLogo } from './img/reactLogo.svg'
import { css } from '@emotion/react'
import { theme } from './util/theme'
import { urls } from './util/urls'
import code from './img/code.svg'
import img1 from './img/st1.png'
import img2 from './img/st2.png'
import logo from './img/logTP.svg'
import scr from './img/scr.png'

/** @jsxImportSource @emotion/react */

const styleHome = {
  homePage: css({
    height: '100vh',
    width: '100%',
    background: theme.colors.main_grey,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: "'Roboto Condensed', sans-serif",
    overflow: 'hidden',
  }),
  col: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '33%',
  }),
  logo: css({
    width: '5rem',
    marginBottom: '3rem',
  }),
  icon_container: css({
    position: 'absolute',
    top: '5rem',
    left: '5rem',
  }),
  icon: css({
    width: '3rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.out,
    margin: '1rem 0',
    borderRadius: '50%',
  }),
  iconLogo: css({
    width: '1.5rem',
    transition: theme.transitions.allEaseOut,
    '&:hover': {
      filter: theme.glows.reactGlowSVG,
    },
  }),
  nav: css({
    width: '3rem',
    height: '10rem',
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.out,
    margin: '1rem 0',
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: '5rem',
    right: '5rem',
  }),
  nav_control: css({
    width: '1.5rem',
    height: '1.5rem',
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.in,
    borderRadius: '1rem',
  }),
  nav_scroll: css({
    width: '1.3rem',
    height: '4rem',
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.out,
    borderRadius: '1rem',
  }),
  nav_scroll_active: css({
    width: '1.3rem',
    height: '2rem',
    background: theme.strokes.reactStroke,
    boxShadow: theme.glows.reactGlow,
    borderRadius: '1rem',
    transition: theme.transitions.allEaseOut,
    animation: `${theme.keyframes.scroll} 5s ease infinite`,
    '&:hover': {
      boxShadow: theme.glows.reactGlowActive,
    },
  }),
  nav_control_active: css({
    width: '1.5rem',
    height: '1.5rem',
    background: theme.strokes.reactStroke,
    boxShadow: theme.glows.reactGlow,
    borderRadius: '1rem',
  }),
  subHeading: css({
    fontWeight: '100',
    color: theme.colors.white,
    textTransform: 'uppercase',
    fontSize: '1rem',
    letterSpacing: '.2rem',
  }),
  mainHeading: css({
    fontWeight: 'bold',
    color: theme.colors.white,
    textTransform: 'uppercase',
    fontSize: '3rem',
    letterSpacing: '.3rem',
  }),
  reactText: css({
    fontWeight: '300',
    textTransform: 'uppercase',
    fontSize: '2rem',
    letterSpacing: '1rem',
    color: theme.colors.react_blue,
  }),
  reactLogoContainer: css({
    width: '20rem',
    height: '20rem',
    border: `0.1px solid ${theme.colors.react_blue_transparent}`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: theme.shadows.outIn,
  }),
  reactLogo: css({
    width: '15rem',
    filter: theme.glows.reactGlowSVG,
    animation: `${theme.keyframes.spin} 50s linear infinite`,
  }),
  leftCode: css({
    width: '25rem',
    position: 'absolute',
    bottom: '5rem',
    left: '5rem',
  }),
  leftImg: css({
    width: '60rem',
    position: 'absolute',
    bottom: '0',
    left: '-2rem',
  }),
  rightCode: css({
    width: '25rem',
    position: 'absolute',
    top: '5rem',
    transform: 'scaleX(-1)',
  }),
  rightImg: css({
    width: '70rem',
    position: 'absolute',
    top: '0rem',
    right: '-32rem',
  }),
}

const stylePortfolio = {
  portfolioPage: css({
    height: '100vh',
    width: '100%',
    background: theme.colors.main_grey,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: "'Roboto Condensed', sans-serif",
    overflow: 'hidden',
  }),
  col: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '25%',
  }),
  colMain: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
  }),
  logo: css({
    width: '5rem',
    margin: '1rem 0',
  }),
  subHeading: css({
    fontWeight: '100',
    color: theme.colors.white,
    textTransform: 'uppercase',
    fontSize: '1rem',
    letterSpacing: '.2rem',
  }),
  mainHeading: css({
    fontWeight: 'bold',
    color: theme.colors.white,
    textTransform: 'uppercase',
    fontSize: '3rem',
    letterSpacing: '.3rem',
  }),
  reactText: css({
    fontWeight: '300',
    textTransform: 'uppercase',
    fontSize: '2rem',
    letterSpacing: '1rem',
    color: theme.colors.react_blue,
  }),
  icon_container: css({
    position: 'absolute',
    top: '50%',
    left: '5rem',
  }),
  nav: css({
    width: '3rem',
    height: '10rem',
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.out,
    margin: '1rem 0',
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    right: '5rem',
  }),
  project: css({
    width: '50rem',
    height: '26rem',
    background: `url(${scr})`,
    backgroundSize: 'cover',
    boxShadow: theme.shadows.basicShadow,
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }),
}

export const Home = () => {
  return (
    <>
      <div css={styleHome.homePage}>
        <div css={styleHome.col}>
          <img css={styleHome.leftCode} src={code} />
          <img css={styleHome.leftImg} src={img1} />
          <div css={styleHome.icon_container}>
            <div css={styleHome.icon}>
              <a href='https://gitlab.com/'>
                <ReactLogo css={styleHome.iconLogo} />
              </a>
            </div>
            <div css={styleHome.icon}>
              <a href='https://gitlab.com/'>
                <ReactLogo css={styleHome.iconLogo} />
              </a>
            </div>
          </div>
        </div>
        <div css={styleHome.col}>
          <div>
            <img src={logo} css={styleHome.logo} />
            <h3 css={styleHome.subHeading}>with soul of artist</h3>
            <h1 css={styleHome.mainHeading}>Tomáš Pektor</h1>
            <span css={styleHome.reactText}>react developer</span>
          </div>
          <div css={styleHome.reactLogoContainer}>
            <ReactLogo css={styleHome.reactLogo} />
          </div>
          <div css={styleHome.nav_scroll}>
            <div css={styleHome.nav_scroll_active}></div>
          </div>
        </div>
        <div css={styleHome.col}>
          <img css={styleHome.rightImg} src={img2} />
          <img css={styleHome.rightCode} src={code} />
          <div css={styleHome.nav}>
            <div css={styleHome.nav_control}>
              <div css={styleHome.nav_control_active}></div>
            </div>
            <div css={styleHome.nav_control}></div>
            <div css={styleHome.nav_control}></div>
            <div css={styleHome.nav_control}></div>
          </div>
        </div>
      </div>

      <div css={stylePortfolio.portfolioPage}>
        <div css={stylePortfolio.col}>
          <div css={stylePortfolio.icon_container}>
            <div css={styleHome.icon}>
              <a href='https://gitlab.com/'>
                <ReactLogo css={styleHome.iconLogo} />
              </a>
            </div>
            <div css={styleHome.icon}>
              <a href='https://gitlab.com/'>
                <ReactLogo css={styleHome.iconLogo} />
              </a>
            </div>
          </div>
        </div>
        <div css={stylePortfolio.colMain}>
          <div>
            <img src={logo} css={stylePortfolio.logo} />
            <h1 css={stylePortfolio.mainHeading}>Name of project</h1>
            <span css={stylePortfolio.reactText}>Portfolio</span>
            <h3 css={stylePortfolio.subHeading}>Project description detail</h3>
          </div>
          <div css={stylePortfolio.project}></div>
          <div css={styleHome.nav_scroll}>
            <div css={styleHome.nav_scroll_active}></div>
          </div>
        </div>
        <div css={stylePortfolio.col}>
          <div css={stylePortfolio.nav}>
            <div css={styleHome.nav_control}>
              <div css={styleHome.nav_control_active}></div>
            </div>
            <div css={styleHome.nav_control}></div>
            <div css={styleHome.nav_control}></div>
            <div css={styleHome.nav_control}></div>
          </div>
        </div>
      </div>

      <div css={stylePortfolio.portfolioPage}>
        <div css={stylePortfolio.col}>
          <div css={stylePortfolio.icon_container}>
            <div css={styleHome.icon}>
              <a href='http://https://gitlab.com/'>
                <ReactLogo css={styleHome.iconLogo} />
              </a>
            </div>
            <div css={styleHome.icon}>
              <a href='http://https://gitlab.com/'>
                <ReactLogo css={styleHome.iconLogo} />
              </a>
            </div>
          </div>
        </div>
        <div css={stylePortfolio.colMain}>
          <div>
            <img src={logo} css={stylePortfolio.logo} />
            <h1 css={stylePortfolio.mainHeading}>Tomáš Pektor</h1>
            <span css={stylePortfolio.reactText}>About ME</span>
          </div>
          <div css={stylePortfolio.project}></div>
          <div css={styleHome.nav_scroll}>
            <div css={styleHome.nav_scroll_active}></div>
          </div>
        </div>
        <div css={stylePortfolio.col}>
          <div css={stylePortfolio.nav}>
            <div css={styleHome.nav_control}>
              <div css={styleHome.nav_control_active}></div>
            </div>
            <div css={styleHome.nav_control}></div>
            <div css={styleHome.nav_control}></div>
            <div css={styleHome.nav_control}></div>
          </div>
        </div>
      </div>
    </>
  )
}
