import { css } from '@emotion/react'
import { sourceCode } from './sourceCode'
import { theme } from '../../Utils/theme'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */

const style = {
  homeworThree: css({
    background: theme.colors.reactBlue,
    maxWidth: '100vw',
    height: '100vh',
    overflow: 'hidden',
  }),
  hackerConsole: css({
    border: 'none',
    overflow: 'hidden',
    background: 'inherit',
    color: theme.colors.white,
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

let pressCount = 3

export const HackerTyper = () => {
  const [codeChars, setCodeChars] = useState('Press key to start hacking...')

  const showCode = () => {
    pressCount += 3
    if (pressCount > sourceCode.length) pressCount = 3
    setCodeChars(sourceCode.slice(0, pressCount))
  }

  return (
    <div css={style.homeworThree}>
      <textarea
        css={style.hackerConsole}
        autoFocus
        spellCheck={false}
        value={codeChars}
        onChange={showCode}
      />
    </div>
  )
}
