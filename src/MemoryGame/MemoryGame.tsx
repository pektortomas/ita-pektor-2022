import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { generateID, pause, shuffle } from '../util/helperFunctions'
import { theme } from '../util/theme'
import { urls } from '../util/urls'
import { useState } from 'react'
import CssImg from './cardImages/css.jpg'
import DefaultImg from './cardImages/default.png'
import GitlabImg from './cardImages/gitlab.jpg'
import HtmlImg from './cardImages/html.jpg'
import JsImg from './cardImages/js.jpg'
import NodeImg from './cardImages/node.jpg'
import ReactImg from './cardImages/react.jpg'
import TSImg from './cardImages/typescript.jpg'
import WebpackImg from './cardImages/webpack.jpg'
import logo from '../img/logTP.svg'
import styled from '@emotion/styled'

/** @jsxImportSource @emotion/react */

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
    maxWidth: '100%',
    margin: '0',
    padding: '0 5rem',
    height: '100vh',
    maxHeight: '100vh',
    background: theme.colors.main_grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: theme.colors.white,
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    margin: '2rem auto 0 auto',
  }),
  mainContent: css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2rem auto',
  }),
  topRow: css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5rem 0 0 0',
  }),
  reactText: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.5rem',
    color: theme.colors.reactBlue,
  }),
  heading: css({
    margin: '1rem 0 0 0',
  }),
  logo: css({
    width: '4rem',
  }),
  gameBoard: css({
    display: 'grid',
    gridTemplateColumns: '9rem 9rem 9rem 9rem',
    gridTemplateRows: '9rem 9rem 9rem 9rem',
    justifyContent: 'center',
    alignContent: 'center',
  }),
  card: css({
    height: '8rem',
    width: '8rem',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: theme.shadows.inHard,
    background: theme.colors.dark_grey,
  }),

  clickButton: css({
    background: theme.colors.main_grey,
    border: 'none',
    width: '12rem',
    height: '2.8rem',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: theme.shadows.out,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.3rem',
    margin: '1rem 0',
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
  reveal: css({
    backfaceVisibility: 'hidden',
    backgroundImage: `url(${DefaultImg})`,
  }),
  guessed: css({
    opacity: '50%',
  }),
}

const cards = [
  {
    name: 'html',
    src: HtmlImg,
  },
  {
    name: 'css',
    src: CssImg,
  },
  {
    name: 'js',
    src: JsImg,
  },

  {
    name: 'react',
    src: ReactImg,
  },
  {
    name: 'gitlab',
    src: GitlabImg,
  },
  {
    name: 'node',
    src: NodeImg,
  },
  {
    name: 'webpack',
    src: WebpackImg,
  },
  {
    name: 'typescript',
    src: TSImg,
  },
]

type Card = {
  name: string
  src: string
  id: number
}

type CardProps = {
  key: number
  cardData: Card
  revealCard: (card: number) => void
  isReveal: boolean
  isGuessed: boolean
  isCorrect: Promise<void>
}

const cardsPack = [...cards, ...cards].map(card => ({ ...card, id: generateID() }))

const maxScore = cardsPack.length
const startRound = 0

const MemoryGameCard = (props: CardProps) => (
  <div>
    <img
      onClick={() => {
        if (!props.isGuessed || !props.isReveal) {
          props.revealCard(props.cardData.id)
        }
      }}
      css={[style.card, style.reveal, props.isGuessed ? style.guessed : undefined]}
      src={props.isReveal || props.isGuessed ? props.cardData.src : DefaultImg}
    />
  </div>
)

export const MemoryGame = () => {
  const [playCards, setplayCards] = useState(cardsPack as Card[])
  const [revealCards, setRevealCards] = useState([] as [] | [number] | [number, number])
  const [corretGuessed, setCorretGuessed] = useState([] as number[])
  const [gameRound, setGameRound] = useState(0)

  const handleClickTip = (cardID: number) => {
    setRevealCards([...revealCards, cardID] as [number] | [number, number])
  }

  const setCorrectGuess = async () => {
    if (revealCards.length !== 2) return

    const firstName = playCards.filter(card => revealCards.includes(card.id))
    await pause(600)
    if (firstName[0].name === firstName[1].name) {
      setCorretGuessed([...corretGuessed, firstName[0].id, firstName[1].id])
      setRevealCards([])
      setGameRound(gameRound + 1)
    }
    setGameRound(gameRound + 1)
    setRevealCards([])
  }

  const getRevalCards = (id: number) => {
    return revealCards.some(cardID => cardID === id)
  }

  const getCorrectCards = (id: number) => {
    return corretGuessed.some(cardID => cardID === id)
  }

  return (
    <div css={style.page}>
      <div css={style.topRow}>
        <Link to={urls.home}>
          <StyledBackButton>Back to Home Page</StyledBackButton>
        </Link>
        <img src={logo} css={style.logo} />
      </div>
      <div css={style.content}>
        <div css={style.heading}>
          <StyledMainHeading>Memory Game</StyledMainHeading>
          <span css={style.reactText}>Try your memory!</span>
        </div>
        <div css={style.mainContent}>
          <div css={style.col}>
            <p css={style.gameText}>Round {gameRound}</p>
          </div>

          <div css={style.colMain}>
            <div css={style.gameBoard}>
              {playCards.map(card => (
                <MemoryGameCard
                  key={card.id}
                  cardData={card}
                  revealCard={handleClickTip}
                  isReveal={gameRound === startRound ? true : getRevalCards(card.id)}
                  isGuessed={getCorrectCards(card.id)}
                  isCorrect={setCorrectGuess()}
                />
              ))}
            </div>
          </div>
          <div css={style.col}>
            {gameRound === startRound && (
              <div css={style.clickButton}>
                <button
                  css={style.innerButton}
                  onClick={() => {
                    setplayCards(shuffle(cardsPack))
                    setGameRound(1)
                  }}
                >
                  Start Game
                </button>
              </div>
            )}

            {gameRound !== startRound && (
              <p css={style.gameText}>Score {corretGuessed.length / 2}</p>
            )}
          </div>
        </div>
        {corretGuessed.length === maxScore && (
          <div css={style.clickButton}>
            <button
              css={style.innerButton}
              onClick={() => {
                setplayCards(shuffle(cardsPack))
                setGameRound(1)
                setCorretGuessed([])
              }}
            >
              Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
