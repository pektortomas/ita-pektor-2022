import { Helmet } from 'react-helmet'
import { css } from '@emotion/react'
import { isNumberObject } from 'util/types'
import { theme } from '../util/theme'
import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */

const style = {
  MortgageCalculatorPage: css({
    height: '100vh',
    margin: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.lightReactBlue,
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '100vw',
    },
  }),
  MortgageCalculator: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '3rem',
    borderRadius: '10px',
    width: '25rem',
    height: '50%',
    textAlign: 'center',
    background: theme.colors.whiteTransparent,
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      maxWidth: '90%',
      padding: '3rem 0',
    },
  }),
  heading: css({
    margin: '0px',
  }),
  inputs: css({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    height: '50%',
  }),
  input: css({
    margin: '.5rem',
    height: '2.5rem',
    fontSize: '1.5rem',
    border: '1px solid',
    borderRadius: '10px',
    textAlign: 'center',
    borderColor: theme.colors.reactBlue,
    '&:focus': {
      outline: 'none',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '90%',
    },
  }),
  label: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }),
}

type MortgageData = {
  amount: number | null
  interest: number | null
  months: number | null
}

export default function MortgageCalculator() {
  const [mortgageData, setMortgageData] = useState<MortgageData>({
    amount: null,
    interest: null,
    months: null,
  })

  const calculateMortgageTotal = () => {
    const amount = mortgageData.amount ?? 0
    const interest = mortgageData.interest ? mortgageData.interest / 100 / 12 : 0
    const time = mortgageData.months ? mortgageData.months * 12 : 0
    const calculateTotal = () => {
      if (interest)
        return (
          (amount * interest * Math.pow(1 + interest, time)) / (Math.pow(1 + interest, time) - 1)
        )
      return amount / time
    }

    if (calculateTotal && isFinite(calculateTotal())) {
      return calculateTotal().toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }
  }
  return (
    <div css={style.MortgageCalculatorPage}>
      <div css={style.MortgageCalculator}>
        <h2 css={style.heading}>Mortgage Calculator</h2>
        <div css={style.inputs}>
          <label css={style.label}>
            Loan Amount
            <input
              css={style.input}
              type='number'
              name='amount'
              placeholder='Enter value'
              step='100000'
              required
              value={mortgageData.amount ?? ''}
              onChange={e => setMortgageData({ ...mortgageData, amount: parseInt(e.target.value) })}
            />
          </label>

          <label css={style.label}>
            Interest Rate
            <input
              css={style.input}
              type='number'
              name='interest'
              placeholder='Enter value'
              min='0.0'
              step='0.1'
              required
              value={mortgageData.interest ?? ''}
              onChange={e =>
                setMortgageData({ ...mortgageData, interest: parseFloat(e.target.value) })
              }
            />
          </label>

          <label css={style.label}>
            Loan term in years
            <input
              css={style.input}
              type='number'
              name='time'
              placeholder='Enter value'
              required
              value={mortgageData.months ?? ''}
              onChange={e => setMortgageData({ ...mortgageData, months: parseInt(e.target.value) })}
            />
          </label>
        </div>
        <div>
          <p>Payment for month</p>
          <h2>{calculateMortgageTotal() ?? 0} CZK</h2>
        </div>
      </div>
    </div>
  )
}
