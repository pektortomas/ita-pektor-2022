import { Helmet } from 'react-helmet'
import { css } from '@emotion/react'
import { customClasses, theme } from '../util/theme'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import { urls } from '../util/urls'
import logo from '../img/logTP.svg'
import styled from '@emotion/styled'

type ActualChart = 'default' | 'principal' | 'inflation' | 'property'

type PaymentData = {
  currentValue: number
  monthInterest: number
  monthPrincipal: number
}
type TableProps = {
  payment: PaymentData[] | []
}
type ChartProps = {
  payment: PaymentData[] | []
  principalPay: { principalPay: number }[] | []
  dataWithInflation: { valueWithInflation: number }[] | []
  futurePropertyValue: { propertyWithInflation: number }[] | []
  actualChart: ActualChart
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

const calculateAnnuityPayment = (arg: {
  interest: number
  years: number
  total: number
  amount: number
}) => {
  const payment = [] as PaymentData[]
  if (!arg.years || !arg.total) return [{ currentValue: 1, monthInterest: 1, monthPrincipal: 1 }]
  const months = new Array(arg.years * 12).fill(1)
  const getMonthInterest = (prevValue: number) => {
    return (arg.interest / 12) * (prevValue / 100)
  }
  const getMonthPrincipal = (monthInterest: number) => {
    return arg.total - monthInterest
  }

  months.forEach((month, i) => {
    payment.push({
      currentValue:
        i > 0
          ? payment[i - 1].currentValue -
            getMonthPrincipal(getMonthInterest(payment[i - 1].currentValue))
          : arg.amount,
      monthInterest:
        i > 0 ? getMonthInterest(payment[i - 1].currentValue) : getMonthInterest(arg.amount),
      monthPrincipal:
        i > 0
          ? getMonthPrincipal(getMonthInterest(payment[i - 1].currentValue))
          : getMonthPrincipal(getMonthInterest(arg.amount)),
    })
  })

  return payment
}

const getMonthInflationFromYearData = (
  yearlyInflation: number,
  total: number,
  monthInterest: number[],
  monthPrincipal: number[],
  years: number
) => {
  const monthlyInflation = (1 + -yearlyInflation / 100) ** (1 / 12) - 1
  const valuesWithInflation = new Array()
  const months = new Array(years * 12).fill(1)
  let inflationCoeficient = 1

  months.forEach((month, i) => {
    valuesWithInflation.push({
      totalWithInflation: i > 0 ? total * inflationCoeficient : total,
      interestWithInflation: i > 0 ? monthInterest[i - 1] * inflationCoeficient : monthInterest[i],
      principlaWithInflation:
        i > 0 ? monthPrincipal[i - 1] * inflationCoeficient : monthPrincipal[i],
    })
    inflationCoeficient = inflationCoeficient * (1 + monthlyInflation)
  })

  return valuesWithInflation
}
const getPropertyValueWithInflation = (arg: {
  inflation: number
  propertyValue: number
  years: number
}) => {
  let value = arg.propertyValue
  const valuesWithInflation = new Array(arg.years).fill(0).map((_, i, arr) => {
    i > 0 ? (value += arr[i - 1] + (arg.propertyValue / 100) * arg.inflation) : value
    return { propertyWithInflation: value }
  })

  return valuesWithInflation
}

const MortgageTable = (props: TableProps) => {
  return (
    <div css={style.container}>
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
            {props.payment?.map(row => (
              <tr key={row.currentValue}>
                <td>{parseFloat(row.currentValue.toFixed(2))}</td>
                <td>{parseFloat(row.monthInterest.toFixed(2))}</td>
                <td>{parseFloat(row.monthPrincipal.toFixed(2))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const MortgageGraphs = (props: ChartProps) => {
  return (
    <div css={style.charts}>
      {props.actualChart === 'default' && (
        <div css={style.chartContainer}>
          <h2>Loan Graphs</h2>
          <LineChart width={530} height={300} data={props.payment}>
            <CartesianGrid />
            <XAxis dataKey='monthInterest' tick={false} />
            <YAxis yAxisId='left' />
            <YAxis yAxisId='right' orientation='right' />
            <Tooltip />
            <Legend />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='monthInterest'
              stroke={theme.colors.reactBlue}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='monthPrincipal'
              stroke={theme.colors.green}
            />
          </LineChart>
        </div>
      )}

      {props.actualChart === 'principal' && (
        <div css={style.chartContainer}>
          <h2>Principal pay in time</h2>
          <LineChart width={530} height={300} data={props.principalPay}>
            <CartesianGrid />
            <XAxis dataKey='principalPay' tick={false} />
            <YAxis yAxisId='left' />
            <Tooltip />
            <Legend />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='principalPay'
              stroke={theme.colors.reactBlue}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      )}
      {props.actualChart === 'inflation' && (
        <div css={style.chartContainer}>
          <h2>Data with inflation</h2>
          <LineChart width={530} height={300} data={props.dataWithInflation}>
            <CartesianGrid />
            <XAxis dataKey='' tick={false} />
            <YAxis yAxisId='left' />
            <YAxis yAxisId='right' orientation='right' />
            <Tooltip />
            <Legend />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='totalWithInflation'
              stroke={theme.colors.red}
            />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='interestWithInflation'
              stroke={theme.colors.reactBlue}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='principlaWithInflation'
              stroke={theme.colors.green}
            />
          </LineChart>
        </div>
      )}
      {props.actualChart === 'property' && (
        <div css={style.chartContainer}>
          <h2>Property future value</h2>
          <LineChart width={530} height={300} data={props.futurePropertyValue}>
            <CartesianGrid />
            <XAxis dataKey='' tick={false} />
            <YAxis yAxisId='left' />
            <YAxis yAxisId='right' orientation='right' />
            <Tooltip />
            <Legend />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='propertyWithInflation'
              stroke={theme.colors.red}
            />
          </LineChart>
        </div>
      )}
    </div>
  )
}

export const MortgageCalculator = () => {
  const [actualChart, setActualChart] = useState('default' as ActualChart)
  const [amount, setAmount] = useState(2_500_000)
  const [interest, setInterest] = useState(6)
  const [years, setYears] = useState(30)
  console.info(years)
  const [inflation, setInflation] = useState(5)
  const total = calculateMortgageTotal(amount, interest!, years!)
  const [propertyValue, setPropertyValue] = useState(3_000_000)
  const payment = calculateAnnuityPayment({ interest, years, total, amount })
  const principalPay = payment?.map(payment => ({ principalPay: amount - payment.currentValue }))
  const dataWithInflation = getMonthInflationFromYearData(
    inflation,
    total,
    payment!.map(pay => {
      return pay.monthInterest
    }),
    payment!.map(pay => {
      return pay.monthPrincipal
    }),
    years
  )
  const propertyFutureValue = getPropertyValueWithInflation({ inflation, propertyValue, years })

  return (
    <div css={style.page}>
      <Helmet>
        <title>Tomáš Pektor - Mortgage Calculator</title>
        <meta name='description' content='Kalkulátor hypotéky v Reactu' />
        <link rel='canonical' href='http://tomaspektor.cz/mortgage-calculator' />
      </Helmet>
      <div css={style.topRow}>
        <HashLink to={urls.portfolioHash} css={customClasses.tabletHidden}>
          <StyledBackButton>Back to Home Page</StyledBackButton>
        </HashLink>
        <img src={logo} css={style.logo} />
      </div>
      <div css={style.content}>
        <div css={style.heading}>
          <StyledMainHeading>Mortgage Calculator</StyledMainHeading>
          <span css={style.reactText}>React loan Calculator</span>
        </div>
        <div css={style.mainContent}>
          <div css={style.col1}>
            <div css={style.container}>
              <div css={style.bigInput}>
                <p>Loan Amount</p>
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
                  onChange={e =>
                    setAmount(parseInt(e.target.value.length > 0 ? e.target.value : '1000'))
                  }
                />
              </div>

              <div css={style.inputRow}>
                <div css={style.inputContainer}>
                  <p>Interest</p>
                  <input
                    css={style.inputSmall}
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
                </div>

                <div css={style.inputContainer}>
                  <p>Years</p>
                  <input
                    css={style.inputSmall}
                    type='number'
                    name='time'
                    min='1'
                    placeholder='Enter value'
                    autoComplete='off'
                    required
                    value={years}
                    onChange={e =>
                      setYears(parseInt(e.target.value.length > 0 ? e.target.value : '1'))
                    }
                  />
                </div>
                <div css={style.inputContainer}>
                  <p>Inflation</p>
                  <input
                    css={style.inputSmall}
                    type='number'
                    name='time'
                    min='0.1'
                    step='0.1'
                    placeholder='Enter value'
                    autoComplete='off'
                    required
                    value={inflation}
                    onChange={e => setInflation(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div css={style.bigInput}>
                <p>Property Value</p>
                <input
                  css={style.input}
                  type='number'
                  name='time'
                  min='0.1'
                  step='0.1'
                  placeholder='Enter value'
                  autoComplete='off'
                  value={propertyValue}
                  onChange={e => setPropertyValue(parseFloat(e.target.value))}
                />
              </div>
              <div>
                <p>Payment for month</p>
                <h2>{Math.round(calculateMortgageTotal(amount, interest, years)) ?? 0} CZK</h2>
              </div>
            </div>
            <MortgageTable payment={payment ?? []} />
          </div>
          <div css={style.col2}>
            <MortgageGraphs
              payment={payment ?? []}
              principalPay={principalPay ?? []}
              dataWithInflation={dataWithInflation ?? []}
              futurePropertyValue={propertyFutureValue ?? []}
              actualChart={actualChart}
            />
            <div css={style.filterRow}>
              <div css={style.clickButton}>
                <button css={style.innerButton} onClick={() => setActualChart('default')}>
                  Loan
                </button>
              </div>
              <div css={style.clickButton}>
                <button css={style.innerButton} onClick={() => setActualChart('principal')}>
                  Principal
                </button>
              </div>
              <div css={style.clickButton}>
                <button css={style.innerButton} onClick={() => setActualChart('inflation')}>
                  Loan with Inflation
                </button>
              </div>
              <div css={style.clickButton}>
                <button css={style.innerButton} onClick={() => setActualChart('property')}>
                  Property value
                </button>
              </div>
            </div>
            <HashLink to={urls.portfolioHash} css={customClasses.desktopHidden}>
              <StyledBackButton>Back to Home Page</StyledBackButton>
            </HashLink>
          </div>
        </div>
      </div>
    </div>
  )
}

const StyledBackButton = styled.button({
  background: theme.colors.reactBlueDark,
  border: 'none',
  width: '12rem',
  height: '3rem',
  fontSize: '0.6rem',
  textTransform: 'uppercase',
  borderRadius: '8px',
  color: theme.colors.white,
  fontWeight: 'bolder',
  letterSpacing: '.1rem',
  cursor: 'pointer',
  '&:hover': {
    filter: theme.glows.reactGlowSVG,
  },
  [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
    margin: '2rem 0',
  },
})

const StyledMainHeading = styled.h1({
  fontWeight: 'bolder',
  textTransform: 'uppercase',
  fontSize: '1.5rem',
  letterSpacing: '.3rem',
  margin: '0',
})

const style = {
  page: css({
    maxWidth: '100vw',
    margin: '0',
    padding: '0 5rem',
    height: '100%',
    minHeight: '100vh',
    maxHeight: '100%',
    background: theme.colors.main_grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: theme.colors.white,
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '0',
    },
  }),
  col1: css({
    width: '40%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
      margin: '0 auto',
    },
  }),
  col2: css({
    width: '60%',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    padding: '0 5rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      alignItems: 'center',
      padding: '0',
      width: '100%',
    },
  }),
  input: css({
    color: theme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: '.2rem',
    boxShadow: theme.shadows.inHard,
    background: theme.colors.dark_grey,
    height: '3rem',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    width: '95%',
    textAlign: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '0',
    },
  }),
  inputSmall: css({
    color: theme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: '.2rem',
    boxShadow: theme.shadows.inHard,
    background: theme.colors.dark_grey,
    height: '3rem',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    width: '90%',
    textAlign: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '95%',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '90%',
    },
  }),
  inputContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    margin: '2rem auto 0 auto',
  }),
  container: css({
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.out,
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    borderRadius: '5px',
    maxWidth: '35rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    marginBottom: '1.2rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '80%',
      margin: '1rem 0',
    },
  }),
  mainContent: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '2rem auto',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      flexDirection: 'column',
    },
  }),
  topRow: css({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '5rem 0 0 0',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '2rem 0 0 0 ',
      justifyContent: 'center',
    },
  }),
  reactText: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.5rem',
    color: theme.colors.reactBlue,
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      fontSize: '0.6rem',
    },
  }),
  heading: css({
    margin: '1rem 0 0 0',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      margin: '0',
    },
  }),
  logo: css({
    width: '4rem',
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      justifyContent: '2rem',
    },
  }),
  tableContainer: css({
    height: '12rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    padding: '1rem 0',
    overflowY: 'scroll',
    borderRadius: '5px',
    boxShadow: theme.shadows.inHard,
    background: theme.colors.dark_grey,
  }),
  table: css({
    width: '100%',
    display: 'table',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '90%',
    },
  }),
  charts: css({
    width: '100%',
    overflow: 'hidden',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
  }),
  chartContainer: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
    },
  }),
  chartRow: css({
    width: '100%',
    maxWidth: '1000px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
  bigInput: css({
    width: '100%',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      margin: '0 auto',
    },
  }),
  inputRow: css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  clickButton: css({
    background: theme.colors.main_grey,
    border: 'none',
    width: '13rem',
    height: '2.8rem',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: theme.shadows.out,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.3rem',
    margin: '1rem 1rem',
  }),
  innerButton: css({
    background: theme.colors.main_grey,
    border: '1px solid',
    color: theme.colors.reactBlue,
    borderColor: theme.colors.dark_grey,
    boxShadow: theme.shadows.inOut,
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    letterSpacing: '.2rem',
    transition: theme.transitions.allEaseOut,
    '&:hover': {
      filter: theme.glows.reactGlowSVG_little,
      borderColor: theme.colors.reactBlue,
    },
  }),
  colMain: css({
    width: '40rem',
    height: '36rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 2rem',
  }),
  col: css({
    width: '7rem',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0',
  }),
  gameText: css({
    fontWeight: 'lighter',
    textTransform: 'uppercase',
    letterSpacing: '.2rem',
  }),
  filterRow: css({
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      display: 'none',
    },
  }),
}
