import { css } from '@emotion/react'
import { theme } from '../util/theme'
import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */

const style = {
  page: css({
    background: theme.colors.lightReactBlue,
    maxWidth: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
}

export const HttpFilter = () => {
  const [value, setValue] = useState('')
  const [data, setData] = useState([] as { id: string; name: string }[])
  return (
    <div css={style.page}>
      <input
        type='text'
        value={value}
        onChange={async e => {
          setValue(e.target.value)
          const response = await fetch(`http://localhost:1234/http-filter?search=${e.target.value}`)
          setData(await response.json())
        }}
      />
      {data.map(i => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  )
}
