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
          try {
            const response = await fetch(
              `${process.env.REACT_APP_HTTP_FILTER_URL}?search=${e.target.value}`
            )
            setData(await response.json())
          } catch (err) {
            if (err) alert('chyba serveru')
          }
        }}
      />
      {data.map(i => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  )
}
