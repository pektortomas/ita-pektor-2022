import { Component } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from '../util/theme'
import { urls } from '../util/urls'
/** @jsxImportSource @emotion/react */

type Props = {}
type State = {
  counterValue: number
}

const style = {
  homeworkTwo: css({
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.lightReactBlue,
    color: theme.colors.white,
  }),
  homeworkBackToHomeLink: css({
    color: theme.colors.white,
    position: 'absolute',
    top: '3vh',
    left: '3vw',
    textDecoration: 'none',
  }),
  counterContainer: css({
    display: 'flex',
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  buttonRow: css({
    display: 'flex',
    width: '50%',
    justifyContent: 'space-around',
  }),
  button: css({
    borderRadius: '10px',
    width: '20rem',
    margin: '0 2rem',
    padding: '1rem 2rem',
    cursor: 'pointer',
    border: 'none',
    background: theme.colors.white,
    textTransform: 'uppercase',
    transition: theme.transitions.basicEaseIn,
    boxShadow: theme.shadows.basicShadow,
    '&:hover': {
      background: theme.colors.reactBlue,
    },
  }),
}

export class Counter extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      counterValue: 0,
    }
  }
  render() {
    return (
      <div css={style.homeworkTwo}>
        <Link css={style.homeworkBackToHomeLink} to={urls.home}>
          <span>Back to Home Page</span>
        </Link>
        <div css={style.counterContainer}>
          <h1>Count: {this.state.counterValue}</h1>
          <div css={style.buttonRow}>
            <button
              css={style.button}
              onClick={() => this.setState({ counterValue: this.state.counterValue + 1 })}
            >
              Increase
            </button>
            <button
              css={style.button}
              onClick={() => this.setState({ counterValue: this.state.counterValue - 1 })}
            >
              Decrease
            </button>
          </div>
        </div>
      </div>
    )
  }
}
