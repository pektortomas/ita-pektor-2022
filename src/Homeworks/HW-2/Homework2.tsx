import { Component } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from '../../Utils/theme'
import { urls } from '../../Utils/urls'
/** @jsxImportSource @emotion/react */

type Props = {}
type State = {
  counterValue: number
}

const style = {
  homeworkTwo: css({
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.colors.reactBlue,
    color: theme.colors.white,
  }),
  homeworkBackToHomeLink: css({
    color: theme.colors.white,
    position: 'absolute',
    top: '3vh',
    left: '3vw',
    textDecoration: 'none',
  }),
  buttonRow: css({
    display: 'flex',
    justifyContent: 'space-around',
  }),
}

export class Homework2 extends Component<Props, State> {
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
        <h1>Count: {this.state.counterValue}</h1>
        <div css={style.buttonRow}>
          <button onClick={() => this.setState({ counterValue: this.state.counterValue + 1 })}>
            Increase
          </button>
          <button onClick={() => this.setState({ counterValue: this.state.counterValue - 1 })}>
            Decrease
          </button>
        </div>
      </div>
    )
  }
}
