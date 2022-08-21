import { Helmet } from 'react-helmet'
import { css } from '@emotion/react'
import { theme } from '../util/theme'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

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
  tableContainer: css({
    maxHeight: '50vh',
    overflow: 'scroll',
    overflowX: 'hidden',
    margin: '5rem 0 ',
    padding: '0 3rem',
  }),
  table: css({
    display: 'table',
    textAlign: 'center',
    background: theme.colors.whiteTransparent,
    padding: '3rem',
    borderRadius: '10px',
    width: '25rem',
    maxHeight: '10vh',
  }),
  chart: css({
    margin: '5rem',
  }),
}
type PaymentData = {
  currentValue: number
  monthInterest: number
  monthPrincipal: number
}

export const calculateMortgageTotal = (
  dataAmount: number,
  dataInterest: number,
  dataYears: number
) => {
  const amount = typeof dataAmount === 'number' ? dataAmount : 0
  const interest = dataInterest ? dataInterest / 100 / 12 : 0
  const time = dataYears ? dataYears * 12 : 0

  if (interest)
    return (amount * interest * Math.pow(1 + interest, time)) / (Math.pow(1 + interest, time) - 1)

  return amount / time
}

const calculateAnnuityPayment = (
  interest: number,
  years: number,
  total: number,
  amount: number
) => {
  if (!years || !total) return
  const payment = [] as PaymentData[]
  const months = years * 12
  const getMonthInterest = (prevValue: number) => {
    return (interest / 12) * (prevValue / 100)
  }
  const getMonthPrincipal = (monthInterest: number) => {
    return total - monthInterest
  }

  for (let i = 0; i < months + 1; i++) {
    payment.push({
      currentValue:
        i > 0
          ? payment[i - 1].currentValue -
            getMonthPrincipal(getMonthInterest(payment[i - 1].currentValue))
          : amount,
      monthInterest:
        i > 0 ? getMonthInterest(payment[i - 1].currentValue) : getMonthInterest(amount),
      monthPrincipal:
        i > 0
          ? getMonthPrincipal(getMonthInterest(payment[i - 1].currentValue))
          : getMonthPrincipal(getMonthInterest(amount)),
    })
  }
  return payment
}

export const MortgageCalculator = () => {
  const [amount, setAmount] = useState(2_500_000)
  const [interest, setInterest] = useState(6)
  const [years, setYears] = useState(5)
  const total = calculateMortgageTotal(amount, interest!, years!)
  const payment = calculateAnnuityPayment(interest, years, total, amount)
  const principalPay = payment?.map(payment => {
    return { principalPay: amount - payment.currentValue }
  })

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
          <h2>{Math.round(calculateMortgageTotal(amount, interest, years)) ?? 0} CZK</h2>
        </div>
      </div>
      <div css={style.tableContainer}>
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
      <div>
        <LineChart width={460} height={300} data={payment}>
          <CartesianGrid />
          <XAxis dataKey='currentValue' tick={false} />
          <YAxis yAxisId='left' />
          <YAxis yAxisId='right' orientation='right' />
          <Tooltip />
          <Legend />
          <Line
            yAxisId='left'
            type='monotone'
            dataKey='monthInterest'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
          <Line yAxisId='right' type='monotone' dataKey='monthPrincipal' stroke='#82ca9d' />
        </LineChart>
        <LineChart width={410} height={300} data={principalPay}>
          <CartesianGrid />
          <XAxis dataKey='principalPay' tick={false} />
          <YAxis yAxisId='left' />
          <Tooltip />
          <Legend />
          <Line
            yAxisId='left'
            type='monotone'
            dataKey='principalPay'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  )
}
