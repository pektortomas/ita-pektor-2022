import { css, keyframes } from '@emotion/react'

export const theme = {
  colors: {
    white: 'white',
    whiteTransparent: 'rgba(86, 89, 103, 0.1)',
    black: 'black',
    darkGrey: '#334A52',
    lightReactBlue: '#CCF2FA',
    red: '#FF0000',
    green: '#7CFC00',
    main_grey: '#262626',
    dark_grey: '#1a1a1a',
    reactBlue: '#61DBFB',
    reactBlueTransparent: 'rgba(97, 219, 251, 0.07)',
    reactBlueDark: '#11B4DF',
  },
  fontSizes: {
    bigSize: '2.5rem',
    midSize: '1.5rem',
  },
  mediaMaxSizes: {
    mobileMin: '330px',
    mobile: '500px',
    tablet: '1025px',
    desktop: '1280px',
    desktopBig: '1600px',
  },
  shadows: {
    basicShadow: '0px 0px 30px #1a1919;',
    out: '6px 6px 10px #1a1a1a,-6px -6px 10px #323232;',
    in: 'inset 6px 6px 10px #1a1a1a,inset -6px -6px 10px #323232;',
    inOut: 'inset 3px 3px 8px #323232,inset -3px -3px 8px #1a1a1a;',
    inHard: 'inset 0px 2px 3px #0d0d0d',
    inHarder: 'inset 0px 2px 5px #1a1a1a',
    outIn:
      '6px 6px 10px #1a1a1a,-6px -6px 10px #323232, inset 1px 1px 15px #1a1a1a,inset -3px -3px 10px #323232;',
  },
  glows: {
    reactGlow: '0px 0px 10px 4px rgba(3,197,245,0.3);',
    reactGlowActive: '0px 0px 10px 4px rgba(3,197,245,0.5);',
    reactGlowSVG: 'drop-shadow(0px 0px 10px rgb(3 197 245 / 0.4))',
    reactGlowSVG_little: 'drop-shadow(0px 0px 3px rgb(3 197 245 / 0.4))',
  },
  strokes: {
    reactStroke: 'radial-gradient(circle at center, #61DBFB 0, #03C3F5 100%)',
  },
  transitions: {
    allEaseOut: 'all 0.5s ease-out;',
    basicEaseIn: 'all 0.5s ease-out;',
  },
  keyframes: {
    spin: keyframes`from {transform:rotate(0deg);}to {transform:rotate(360deg);}`,
    scroll: keyframes`0% {transform: translateY(0);}15% {transform: translateY(2rem);}60% {transform: translateY(2rem);}100% {transform: translateY(0rem);}`,
  },
  borderRadius: {
    default: '15px',
    round: '50%',
    small: '5px',
  },
} as const

export const customClasses = {
  mobileHidden: css({
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      display: 'none',
    },
  }),
  tabletHidden: css({
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
  }),
  desktopHidden: css({
    [`@media (min-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
  }),
} as const
