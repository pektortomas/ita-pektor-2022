import { Helmet } from 'react-helmet'
import { css } from '@emotion/react'
import { theme } from '../util/theme'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */

const style = {
  MortgageCalculatorPage: css({
    height: '100%',
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
  table: css({
    display: 'table',
    textAlign: 'center',
    margin: '5rem',
    background: theme.colors.whiteTransparent,
    padding: '3rem',
    borderRadius: '10px',
    width: '25rem',
  }),
}
type PaymentData = {
  currentValue: number
  monthInterest: number
  monthPrincipal: number
}

type MortgageData = number
export const calculateMortgageTotal = (
  dataAmount: MortgageData,
  dataInterest: MortgageData,
  dataYears: MortgageData
) => {
  const amount = typeof dataAmount === 'number' ? dataAmount : 0
  const interest = dataInterest ? dataInterest / 100 / 12 : 0
  const time = dataYears ? dataYears * 12 : 0

  if (interest)
    return (amount * interest * Math.pow(1 + interest, time)) / (Math.pow(1 + interest, time) - 1)

  return amount / time
}

const calculateAnnuityPayment = (interest: number, years: number, total: number) => {
  if (!years || !total) return
  const payment = [] as PaymentData[]
  const months = years * 12
  const totalValue = parseFloat((total * months).toFixed(2))
  const getMonthInterest = (prevValue: number) => {
    return (interest / 12) * (prevValue / 100)
  }
  const getMonthPrincipal = (monthInterest: number) => {
    return total - monthInterest
  }
  for (let i = 0; i < months; i++) {
    payment.push({
      currentValue:
        i > 0
          ? payment[i - 1].currentValue -
            (getMonthInterest(payment[i - 1].currentValue) +
              getMonthPrincipal(getMonthInterest(payment[i - 1].currentValue)))
          : totalValue,
      monthInterest:
        i > 0 ? getMonthInterest(payment[i - 1].currentValue) : getMonthInterest(totalValue),
      monthPrincipal:
        i > 0
          ? getMonthPrincipal(getMonthInterest(payment[i - 1].currentValue))
          : getMonthPrincipal(getMonthInterest(totalValue)),
    })
  }
  return payment
}

export default function MortgageCalculator() {
  const [amount, setAmount] = useState<MortgageData>(2_500_000)
  const [interest, setInterest] = useState<MortgageData>(6)
  const [years, setYears] = useState<MortgageData>(5)

  const total = calculateMortgageTotal(amount, interest!, years!)
  const payment = calculateAnnuityPayment(interest, years, total)

  return (
    <div css={style.MortgageCalculatorPage}>
      <Helmet>
        <title>Tomáš Pektor - Mortgage Calculator</title>
        <meta name='description' content='Kalkulátor hypotéky v Reactu' />
        <link rel='canonical' href='http://tomaspektor.cz/mortgage-calculator' />
      </Helmet>
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
              min='1000'
              autoComplete='off'
              required
              value={amount}
              onChange={e => setAmount(parseInt(e.target.value))}
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
              autoComplete='off'
              required
              value={interest}
              onChange={e => setInterest(parseFloat(e.target.value))}
            />
          </label>

          <label css={style.label}>
            Loan term in years
            <input
              css={style.input}
              type='number'
              name='time'
              min='1'
              placeholder='Enter value'
              autoComplete='off'
              required
              value={years}
              onChange={e => setYears(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <p>Payment for month</p>
          <h2>{Math.round(calculateMortgageTotal(amount, interest!, years!)) ?? 0} CZK</h2>
        </div>
      </div>
      <table css={style.table}>
        <thead>
          <tr>
            <th>Balance</th>
            <th>Interest</th>
            <th>Principal</th>
          </tr>
        </thead>
        <tbody>
          {payment &&
            payment.map(row => (
              <tr key={row.currentValue}>
                <td>{parseFloat(row.currentValue.toFixed(2))}</td>
                <td>{parseFloat(row.monthInterest.toFixed(2))}</td>
                <td>{parseFloat(row.monthPrincipal.toFixed(2))}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
