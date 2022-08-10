import { Helmet } from 'react-helmet'
import { css } from '@emotion/react'
import { sourceCode } from './sourceCode'
import { theme } from '../util/theme'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */

const style = {
  homeworThree: css({
    background: theme.colors.lightReactBlue,
    maxWidth: '100vw',
    height: '100vh',
    overflow: 'hidden',
  }),
  hackerConsole: css({
    border: 'none',
    overflow: 'hidden',
    background: 'inherit',
    color: theme.colors.darkGrey,
    width: '90%',
    height: '90%',
    padding: '2rem',
    fontSize: theme.fontSizes.midSize,
    fontWeight: 'bold',
    '&:focus': {
      outline: 'none',
    },
  }),
}

export const HackerTyper = () => {
  const [pressCount, setPressCount] = useState(0)

  return (
    <div css={style.homeworThree}>
      <Helmet>
        <title>Tomáš Pektor - Hacker Typer</title>
        <meta name='description' content='Jednoduchá React aplikace ve formě function komponenty' />
        <link rel='canonical' href='http://tomaspektor.cz/hacker-typer' />
      </Helmet>
      <textarea
        css={style.hackerConsole}
        autoFocus
        spellCheck={false}
        value={pressCount === 0 ? 'Start typing...' : sourceCode.slice(0, pressCount)}
        onChange={() => setPressCount(pressCount > sourceCode.length ? 0 : pressCount + 3)}
      />
    </div>
  )
}
