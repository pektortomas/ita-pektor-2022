import { css } from '@emotion/react'
import { sourceCode } from './sourceCode'
import { theme } from '../../Utils/theme'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */

const style = {
  homeworThree: css({
    background: theme.colors.reactBlue,
    maxWidth: theme.widthSizes.fullWidth,
    height: theme.heightSizes.fullHeight,
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

type pressCount = number
type codeChars = string

export const HackerTyper = () => {
  const [pressCount, setPressCount] = useState<pressCount>(3)
  const [codeChars, setCodeChars] = useState<codeChars>('Press key to start hacking...')

  const showCode = () => {
    setPressCount(pressCount + 3)
    pressCount > sourceCode.length
      ? setPressCount(0)
      : setCodeChars(sourceCode.slice(0, pressCount))
  }

  return (
    <div css={style.homeworThree}>
      <textarea
        css={style.hackerConsole}
        autoFocus
        spellCheck={false}
        value={codeChars}
        onChange={() => showCode()}
      />
    </div>
  )
}
