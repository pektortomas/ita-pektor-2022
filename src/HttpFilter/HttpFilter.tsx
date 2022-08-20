import { backendFilterUrl } from '../util/backendUrls'
import { css } from '@emotion/react'
import { theme } from '../util/theme'
import { useState } from 'react'
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
  const [customError, setCustomError] = useState('')
  const [loading, setLoading] = useState(false)
  return (
    <div css={style.page}>
      <input
        type='text'
        value={value}
        onChange={async e => {
          setValue(e.target.value)
          try {
            setLoading(true)
            const response = await fetch(backendFilterUrl(e.target.value))
            setData(await response.json())
          } catch (err) {
            if (err) setCustomError('Databáze je dočasně nedostupná')
          } finally {
            setLoading(false)
          }
        }}
      />
      {customError.length > 0 ? (
        <div>{customError}</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        data.map(i => <div key={i.id}>{i.name}</div>)
      )}
    </div>
  )
}