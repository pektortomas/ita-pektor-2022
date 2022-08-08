export const theme = {
  colors: {
    white: 'white',
    whiteTransparent: 'rgba(255, 255, 255, 0.65)',
    black: 'black',
    darkGrey: '#334A52',
    reactBlue: '#61DBFB',
    lightReactBlue: '#CCF2FA',
    red: '#FF7276',
    green: '#A2E4B8',
  },
  fontSizes: {
    bigSize: '2.5rem',
    midSize: '1.5rem',
  },
  mediaMaxSizes: {
    mobile: '480px',
    tablet: '1024px',
    desktop: '1280px',
    desktopBig: '1600px',
  },
  transitions: {
    basicEaseIn: 'all ease-in .2s',
  },
  shadows: {
    basicShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  },
} as const
