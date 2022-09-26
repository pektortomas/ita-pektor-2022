import { Helmet } from 'react-helmet'
import { JSHistory } from './JSHistory/JSHistory'
import { Link } from 'react-router-dom'
import { ReactComponent as ReactLogo } from './img/reactLogo.svg'
import { css } from '@emotion/react'
import { customClasses, theme } from './util/theme'
import { url } from 'inspector'
import { urls } from './util/urls'
import { useEffect, useRef, useState } from 'react'
import Avatar from './img/avatar.png'
import React from 'react'
import code from './img/code.svg'
import git from './img/logos/github.svg'
import hackerScr from './img/screens/hackerTyper.jpg'
import hackerScrM from './img/screens/mobile-hackerTyper.jpg'
import img1 from './img/st1.png'
import img2 from './img/st2.png'
import img3 from './img/st3.png'
import jsScr from './img/screens/jsHistory.jpg'
import jsScrM from './img/screens/mobile-jsHistory.jpg'
import linkedIn from './img/logos/linkedin.svg'
import logo from './img/logTP.svg'
import memoryScr from './img/screens/memory.jpg'
import memoryScrM from './img/screens/mobile-memory.jpg'
import mortgageScr from './img/screens/mortgage.jpg'
import mortgageScrM from './img/screens/mobile-mortgage.jpg'
import stackjs from './img/icons/stack/js.png'
import stacknode from './img/icons/stack/node.png'
import stackreact from './img/icons/stack/react.png'
import stacktypescript from './img/icons/stack/typescript.png'
import todoScr from './img/screens/todo.jpg'
import todoScrM from './img/screens/mobile-todo.jpg'

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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '1.2rem 2rem',
      borderRadius: theme.borderRadius.small,
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100vw',
      paddingBottom: '3rem',
      position: 'relative',
      justifyContent: 'flex-start',
    },
  }),
  col: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '33%',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
  }),
  colMain: css({
    position: 'relative',
    padding: '5rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '33%',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
      padding: '2.2rem 0',
    },
  }),
  logo: css({
    width: '5rem',
    marginBottom: '3rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '3rem',
      marginBottom: '1rem',
    },
  }),
  icon_container: css({
    position: 'absolute',
    top: '5rem',
    left: '5rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
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
    zIndex: '10',
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      bottom: '3.25rem',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      fontSize: '.8rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      fontSize: '.7rem',
    },
  }),
  mainHeading: css({
    fontWeight: 'bold',
    color: theme.colors.white,
    textTransform: 'uppercase',
    fontSize: '3rem',
    letterSpacing: '.3rem',
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      margin: '1rem 0',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      margin: '.5rem 0',
      fontSize: '2.5rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      margin: '.5rem 0',
      fontSize: '1.4rem',
    },
  }),
  reactText: css({
    fontWeight: '300',
    textTransform: 'uppercase',
    fontSize: '2rem',
    letterSpacing: '1rem',
    color: theme.colors.reactBlue,
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      letterSpacing: '.9rem',
      fontSize: '1.5rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      letterSpacing: '.8rem',
      fontSize: '1rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      letterSpacing: '.7rem',
      fontSize: '.7rem',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      width: '17rem',
      height: '17rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      width: '15rem',
      height: '15rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '18rem',
      height: '18rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '14rem',
      height: '14rem',
    },
  }),
  reactLogo: css({
    width: '15rem',
    filter: theme.glows.reactGlowSVG,
    animation: `${theme.keyframes.spin} 50s linear infinite`,
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      height: '12rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      height: '10rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '15rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '11rem',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      width: '50rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      width: '45rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      width: '65rem',
      top: '5rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      width: '60rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
  }),
  middleImg: css({
    width: '40rem',
    display: 'none',
    position: 'absolute',
    bottom: '0rem',
    left: '-7rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'block',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '32rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobileMin})`]: {
      width: '28rem',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100vw',
      paddingBottom: '3rem',
      position: 'relative',
      justifyContent: 'flex-start',
    },
  }),
  col: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '25%',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
  }),
  colMain: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '3rem 0',
    alignItems: 'center',
    width: '50%',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
      justifyContent: 'space-between',
      height: '75%',
      padding: '2rem 0',
    },
  }),
  logo: css({
    width: '5rem',
    margin: '1rem 0',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '3rem',
      marginBottom: '1rem',
    },
  }),
  subHeading: css({
    fontWeight: '100',
    color: theme.colors.white,
    textTransform: 'uppercase',
    fontSize: '1rem',
    letterSpacing: '.2rem',
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      fontSize: '.8rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      fontSize: '.7rem',
    },
  }),
  mainHeading: css({
    fontWeight: 'bold',
    color: theme.colors.white,
    textTransform: 'uppercase',
    fontSize: '3rem',
    letterSpacing: '.3rem',
    marginBottom: '.5rem',
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      fontSize: '2.3rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      fontSize: '2rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      margin: '.5rem 0',
      fontSize: '1.4rem',
    },
  }),
  reactText: css({
    fontWeight: '300',
    textTransform: 'uppercase',
    fontSize: '2rem',
    letterSpacing: '1rem',
    color: theme.colors.reactBlue,
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      fontSize: '1.5rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      fontSize: '1rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      letterSpacing: '.7rem',
      fontSize: '.7rem',
    },
  }),
  icon_container: css({
    display: 'flex',
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
  }),
  nav_scroll: css({
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      width: '38rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '25rem',
      height: '35rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '15rem',
      height: '25rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobileMin})`]: {
      width: '13rem',
    },
  }),
  jsHistory: css({
    background: `url(${jsScr})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      background: `url(${jsScrM})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  }),
  hackerTyper: css({
    background: `url(${hackerScr})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      background: `url(${hackerScrM})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  }),
  todo: css({
    background: `url(${todoScr})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      background: `url(${todoScrM})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  }),
  memory: css({
    background: `url(${memoryScr})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      background: `url(${memoryScrM})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  }),
  mortgage: css({
    background: `url(${mortgageScr})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      background: `url(${mortgageScrM})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      margin: '0 .2rem',
      width: '4.5rem',
      height: '4.5rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      margin: '0 .2rem',
      width: '4rem',
      height: '4rem',
    },
  }),
  myStack: css({
    display: 'flex',
    margin: '1rem',
  }),
  colMain: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '3rem 0',
    alignItems: 'center',
    width: '50%',
    height: '80%',
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      width: '40%',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
      padding: '1.5rem 0',
    },
  }),
  col: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '25%',
    height: '70%',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
  }),
  contactContainer: css({
    display: 'flex',
    height: '33%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      alignItems: 'center',
    },
  }),
  socIcons: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      margin: '0',
    },
  }),
  icon: css({
    width: '3.5rem',
    height: '3.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.out,
    margin: '1rem',
    borderRadius: '50%',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '3rem',
      height: '3rem',
      margin: '.5rem .7rem',
    },
  }),
  avatar: css({
    margin: '2rem 0',
    width: '30rem',
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      width: '18rem',
      margin: '5rem 0',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '15rem',
      margin: '1rem 0',
    },
  }),
  contactMobile: css({
    display: 'none',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'block',
      marginTop: '1rem',
    },
  }),
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
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      padding: '1.7rem 3rem',
      borderRadius: theme.borderRadius.small,
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      fontSize: '.7rem',
      padding: '1rem 2rem',
      borderRadius: theme.borderRadius.small,
    },
  }),
  stackMobile: css({
    display: 'none',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'flex',
      flexDirection: 'column',
      width: '98%',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  cvMobile: css({
    display: 'none',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'flex',
      flexDirection: 'column',
      width: '98%',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      height: '10rem',
    },
  }),
  left: css({
    zIndex: '1',
    top: '46%',
    left: '38%',
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      top: '46%',
      left: '37%',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      top: '35%',
      left: '36%',
    },
  }),
  right: css({
    zIndex: '1',
    top: '46%',
    right: '38%',
    [`@media (max-width: ${theme.mediaMaxSizes.desktopBig})`]: {
      top: '46%',
      right: '37%',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      top: '35%',
      right: '36%',
    },
  }),
}

type carouselProps = {
  children: JSX.Element | JSX.Element[]
  setProjectName: (i: number) => void | undefined
}
type carouselItemProps = {
  children: JSX.Element | JSX.Element[]
}

export const CarouselItem = (props: carouselItemProps) => {
  return <div css={carouselStyle.carouselItem}>{props.children}</div>
}

const Carousel = (props: carouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const updateIndex = (newIndex: number) => {
    let index =
      newIndex < 0
        ? React.Children.count(props.children) - 1
        : newIndex >= React.Children.count(props.children)
        ? 0
        : newIndex
    setActiveIndex(index)
    props.setProjectName(index)
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
  const projects = [
    {
      name: 'JS History',
      desc: 'Simple React web',
    },
    {
      name: 'Hacker Typer',
      desc: 'Simple react state game',
    },
    {
      name: 'Todo App',
      desc: 'Redux Todo App',
    },
    {
      name: 'Memory Game',
      desc: 'React interactive game',
    },
    {
      name: 'Loan Calculator',
      desc: 'React loan calculator',
    },
  ]
  const [project, setProject] = useState(projects[0])
  const handleClick = (i: number) => {
    setProject(projects[i])
  }
  return (
    <div css={style.viewport}>
      <Helmet>
        <title>Tomáš Pektor - React Developer</title>
      </Helmet>
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
            <h1 css={styleHome.mainHeading}>Tomáš Pektor</h1>
            <span css={styleHome.reactText}>react developer</span>
          </div>
          <div css={styleHome.reactLogoContainer}>
            <ReactLogo css={styleHome.reactLogo} />
          </div>
          <div>
            <img css={styleHome.middleImg} src={img3} />
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

      <section id='portfolio' css={stylePortfolio.portfolioPage}>
        <div css={stylePortfolio.col}></div>
        <div css={stylePortfolio.colMain}>
          <div>
            <img src={logo} css={stylePortfolio.logo} />
            <h1 css={stylePortfolio.mainHeading}>{project.name}</h1>
            <span css={stylePortfolio.reactText}>Portfolio</span>
            <h3 css={stylePortfolio.subHeading}>{project.desc}</h3>
          </div>
          <Carousel setProjectName={handleClick}>
            <CarouselItem>
              <Link to={urls.jsHistory}>
                <div css={[stylePortfolio.project, stylePortfolio.jsHistory]}></div>
              </Link>
            </CarouselItem>
            <CarouselItem>
              <Link to={urls.hackerTyper}>
                <div css={[stylePortfolio.project, stylePortfolio.hackerTyper]}></div>
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

          <div css={[styleHome.nav_scroll, stylePortfolio.nav_scroll]}>
            <div css={styleHome.nav_scroll_active}></div>
          </div>
        </div>
        <div css={stylePortfolio.col}></div>
      </section>

      <section css={stylePortfolio.portfolioPage}>
        <div css={styleAboutMe.col}>
          <div>
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
        <div css={styleAboutMe.colMain}>
          <div>
            <img src={logo} css={stylePortfolio.logo} />
            <h1 css={stylePortfolio.mainHeading}>Tomáš Pektor</h1>
            <span css={stylePortfolio.reactText}>About ME</span>
          </div>
          <div css={styleAboutMe.contactMobile}>
            <h3 css={stylePortfolio.subHeading}>Contact me</h3>
            <div css={styleAboutMe.socIcons}>
              <div css={styleAboutMe.icon}>
                <a href='https://github.com/pektortomas/ita-pektor-2022'>
                  <img src={git} css={styleHome.iconLogo} />
                </a>
              </div>
              <div css={styleAboutMe.icon}>
                <a href='https://www.linkedin.com/in/tomas-pektor/'>
                  <img src={linkedIn} css={styleHome.iconLogo} />
                </a>
              </div>
            </div>
          </div>
          <div>
            <img css={styleAboutMe.avatar} src={Avatar} />
          </div>
          <div css={styleAboutMe.cvMobile}>
            <h3 css={stylePortfolio.subHeading}>My resume/CV</h3>
            <div css={styleAboutMe.myStack}>
              <Link to={urls.cv}>
                <button css={styleAboutMe.buttonBlue}>View RESUME/CV</button>
              </Link>
            </div>
          </div>
        </div>
        <div css={styleAboutMe.col}>
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
                  <button css={styleAboutMe.buttonBlue}>View RESUME/CV</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
