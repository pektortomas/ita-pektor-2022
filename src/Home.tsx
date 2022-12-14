import { Helmet } from 'react-helmet'
import { JSHistory } from './JSHistory/JSHistory'
import { Link } from 'react-router-dom'
import { ReactComponent as ReactLogo } from './img/reactLogo.svg'
import { ScrollTrigger } from 'gsap/all'
import { css } from '@emotion/react'
import { gsap } from 'gsap'
import { theme } from './util/theme'
import { url } from 'inspector'
import { urls } from './util/urls'
import { useEffect, useRef, useState } from 'react'
import Avatar from './img/avatar.png'
import React from 'react'
import code from './img/code.svg'
import git from './img/logos/github.svg'
import img1 from './img/st1.png'
import img2 from './img/st2.png'
import jsScr from './img/screens/jsHistory.jpg'
import linkedIn from './img/logos/linkedin.svg'
import logo from './img/logTP.svg'
import memoryScr from './img/screens/memory.jpg'
import mortgageScr from './img/screens/mortgage.jpg'
import stackjs from './img/icons/stack/js.png'
import stacknode from './img/icons/stack/node.png'
import stackreact from './img/icons/stack/react.png'
import stacktypescript from './img/icons/stack/typescript.png'
import todoScr from './img/screens/todo.jpg'

/** @jsxImportSource @emotion/react */
const style = {
  buttonBlue: css({
    background: theme.colors.reactBlueDark,
    color: theme.colors.white,
    textTransform: 'uppercase',
    cursor: 'pointer',
    padding: '2rem 5rem',
    border: 'none',
    borderRadius: theme.borderRadius.default,
    letterSpacing: '.2rem',
    transition: theme.transitions.allEaseOut,
    '&:hover': {
      filter: theme.glows.reactGlowSVG,
    },
  }),
  row: css({
    display: 'flex',
  }),
  viewport: css({
    scrollSnapType: 'y mandatory',
    maxHeight: '100vh',
    maxWidth: '100vw',
    overflowY: 'scroll',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),
}

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
    scrollSnapAlign: 'start',
  }),
  col: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '33%',
  }),
  colMain: css({
    position: 'relative',
    padding: '5rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    width: '3.5rem',
    height: '3.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.out,
    margin: '1rem 1rem',
    borderRadius: '50%',
  }),
  iconLogo: css({
    width: '1.3rem',
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
    position: 'absolute',
    bottom: '2rem',
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
    color: theme.colors.reactBlue,
  }),
  reactLogoContainer: css({
    width: '20rem',
    height: '20rem',
    marginTop: '5rem',
    border: `0.1px solid ${theme.colors.reactBlueTransparent}`,
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
    maxWidth: '100vw',
    background: theme.colors.main_grey,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: "'Roboto Condensed', sans-serif",
    overflow: 'hidden',
    overflowX: 'hidden',
    scrollSnapAlign: 'start',
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
    justifyContent: 'flex-start',
    padding: '3rem 0',
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
    marginBottom: '.5rem',
  }),
  reactText: css({
    fontWeight: '300',
    textTransform: 'uppercase',
    fontSize: '2rem',
    letterSpacing: '1rem',
    color: theme.colors.reactBlue,
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
    boxShadow: theme.shadows.basicShadow,
    borderRadius: '1rem',
    margin: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    transition: theme.transitions.allEaseOut,
    '&:hover': {
      boxShadow: theme.glows.reactGlowActive,
    },
  }),
  jsHistory: css({
    background: `url(${jsScr})`,
    backgroundSize: 'cover',
  }),
  todo: css({
    background: `url(${todoScr})`,
    backgroundSize: 'cover',
  }),
  memory: css({
    background: `url(${memoryScr})`,
    backgroundSize: 'cover',
  }),
  mortgage: css({
    background: `url(${mortgageScr})`,
    backgroundSize: 'cover',
  }),
}

const styleAboutMe = {
  portfolioPage: css({
    height: '100vh',
    width: '100%',
    maxWidth: '100vw',
    background: theme.colors.main_grey,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: "'Roboto Condensed', sans-serif",
    overflow: 'hidden',
  }),
  stackIcon: css({
    borderRadius: '50%',
    background: theme.colors.white,
    border: 'none',
    width: '5rem',
    height: '5rem',
    padding: '0',
    margin: '0 0.5rem',
    display: 'flex',
    justifyContent: 'center',
  }),
  myStack: css({
    display: 'flex',
    margin: '1rem',
  }),
  contactContainer: css({
    display: 'flex',
    height: '33%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
  }),
  socIcons: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  avatar: css({
    margin: '2rem 0',
  }),
}

const carouselStyle = {
  carousel: css({
    //overflow: 'hidden',
  }),
  carouselRow: css({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }),
  inner: css({
    whiteSpace: 'nowrap',
    transition: 'transform 1s',
  }),
  carouselItem: css({
    zIndex: '300',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  }),
  indicator: css({
    display: 'inline-flex',
    justifyContent: 'center',
  }),
  indicatorButton: css({
    position: 'absolute',
    width: '2rem',
    height: '5rem',
    background: theme.colors.reactBlueDark,
    color: theme.colors.white,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: 'none',
    borderRadius: theme.borderRadius.default,
    transition: theme.transitions.allEaseOut,
    '&:hover': {
      filter: theme.glows.reactGlowSVG,
    },
  }),
  left: css({
    zIndex: '1',
    top: '46%',
    left: '34%',
  }),
  right: css({
    zIndex: '1',
    top: '46%',
    right: '34%',
  }),
}

type carouselProps = {
  children: JSX.Element | JSX.Element[]
}

export const CarouselItem = (props: carouselProps) => {
  return <div css={carouselStyle.carouselItem}>{props.children}</div>
}

const Carousel = (props: carouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const updateIndex = (newIndex: number) => {
    setActiveIndex(
      newIndex < 0
        ? React.Children.count(props.children) - 1
        : newIndex >= React.Children.count(props.children)
        ? 0
        : newIndex
    )
  }

  return (
    <div css={carouselStyle.carousel}>
      <div css={carouselStyle.carouselRow}>
        <button
          css={[carouselStyle.indicatorButton, carouselStyle.left]}
          onClick={() => {
            updateIndex(activeIndex - 1)
          }}
        >
          {`<`}
        </button>
        <div css={carouselStyle.inner} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {React.Children.map(props.children, (child, index) => {
            return React.cloneElement(child)
          })}
        </div>
        <button
          css={[carouselStyle.indicatorButton, carouselStyle.right]}
          onClick={() => {
            updateIndex(activeIndex + 1)
          }}
        >
          {`>`}
        </button>
      </div>
    </div>
  )
}

export const Home = () => {
  return (
    <div css={style.viewport}>
      <section css={styleHome.homePage}>
        <div css={styleHome.col}>
          <img css={styleHome.leftCode} src={code} />
          <img css={styleHome.leftImg} src={img1} />
          <div css={styleHome.icon_container}>
            <div css={styleHome.icon}>
              <a href='https://github.com/pektortomas/ita-pektor-2022'>
                <img src={git} css={styleHome.iconLogo} />
              </a>
            </div>
            <div css={styleHome.icon}>
              <a href='https://www.linkedin.com/in/tomas-pektor/'>
                <img src={linkedIn} css={styleHome.iconLogo} />
              </a>
            </div>
          </div>
        </div>
        <div css={styleHome.colMain}>
          <div>
            <img src={logo} css={styleHome.logo} />
            <h3 css={styleHome.subHeading}>with soul of artist</h3>
            <h1 css={styleHome.mainHeading}>Tom???? Pektor</h1>
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
        </div>
      </section>

      <section css={stylePortfolio.portfolioPage}>
        <div css={stylePortfolio.col}>
          <div css={stylePortfolio.icon_container}>
            <div css={styleHome.icon}>
              <a href='https://github.com/pektortomas/ita-pektor-2022'>
                <img src={git} css={styleHome.iconLogo} />
              </a>
            </div>
            <div css={styleHome.icon}>
              <a href='https://www.linkedin.com/in/tomas-pektor/'>
                <img src={linkedIn} css={styleHome.iconLogo} />
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
          <Carousel>
            <CarouselItem>
              <Link to={urls.jsHistory}>
                <div css={[stylePortfolio.project, stylePortfolio.jsHistory]}></div>
              </Link>
            </CarouselItem>
            <CarouselItem>
              <Link to={urls.todoAppRedux}>
                <div css={[stylePortfolio.project, stylePortfolio.todo]}></div>
              </Link>
            </CarouselItem>
            <CarouselItem>
              <Link to={urls.memoryGame}>
                <div css={[stylePortfolio.project, stylePortfolio.memory]}></div>
              </Link>
            </CarouselItem>
            <CarouselItem>
              <Link to={urls.mortgageCalculator}>
                <div css={[stylePortfolio.project, stylePortfolio.mortgage]}></div>
              </Link>
            </CarouselItem>
          </Carousel>

          <div css={styleHome.nav_scroll}>
            <div css={styleHome.nav_scroll_active}></div>
          </div>
        </div>
        <div css={stylePortfolio.col}></div>
      </section>

      <section css={stylePortfolio.portfolioPage}>
        <div css={stylePortfolio.col}>
          <div css={stylePortfolio.icon_container}>
            <div>
              <h3 css={stylePortfolio.subHeading}>My Stack</h3>
              <div css={styleAboutMe.myStack}>
                <div css={styleAboutMe.stackIcon}>
                  <img src={stackjs} />
                </div>
                <div css={styleAboutMe.stackIcon}>
                  <img src={stackreact} />
                </div>
                <div css={styleAboutMe.stackIcon}>
                  <img src={stacktypescript} />
                </div>
                <div css={styleAboutMe.stackIcon}>
                  <img src={stacknode} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div css={stylePortfolio.colMain}>
          <div>
            <img src={logo} css={stylePortfolio.logo} />
            <h1 css={stylePortfolio.mainHeading}>Tom???? Pektor</h1>
            <span css={stylePortfolio.reactText}>About ME</span>
          </div>
          <div>
            <img css={styleAboutMe.avatar} src={Avatar} />
          </div>
        </div>
        <div css={stylePortfolio.col}>
          <div css={styleAboutMe.contactContainer}>
            <div>
              <h3 css={stylePortfolio.subHeading}>Contact me</h3>
              <div css={styleAboutMe.socIcons}>
                <div css={styleHome.icon}>
                  <a href='https://github.com/pektortomas/ita-pektor-2022'>
                    <img src={git} css={styleHome.iconLogo} />
                  </a>
                </div>
                <div css={styleHome.icon}>
                  <a href='https://www.linkedin.com/in/tomas-pektor/'>
                    <img src={linkedIn} css={styleHome.iconLogo} />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 css={stylePortfolio.subHeading}>My resume/CV</h3>
              <div css={styleAboutMe.myStack}>
                <Link to={urls.cv}>
                  <button css={style.buttonBlue}>View RESUME/CV</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
