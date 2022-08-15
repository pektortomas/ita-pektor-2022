import { css } from '@emotion/react'
import { pause, shuffle } from '../util/helperFunctions'
import { theme } from '../util/theme'
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
/** @jsxImportSource @emotion/react */

const style = {
  memoryGamePage: css({
    height: '100vh',
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.lightReactBlue,
  }),
  column: css({
    height: '50%',
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
  }),
  actualRound: css({
    height: '10rem',
    width: '90%',
    borderRadius: '15px',
    background: theme.colors.whiteTransparent,
    boxShadow: theme.shadows.basicShadow,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }),
  actualScore: css({
    height: '10rem',
    width: '90%',
    borderRadius: '15px',
    color: `${theme.colors.white} !important`,
    background: theme.colors.reactBlue,
    boxShadow: theme.shadows.basicShadow,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }),
  gameBoard: css({
    height: '100vh',
    width: '70%',
    display: 'grid',
    gridTemplateColumns: '12rem 12rem 12rem 12rem',
    gridTemplateRows: '12rem 12rem 12rem 12rem',
    justifyContent: 'center',
    alignContent: 'center',
  }),
  memoryGameCard: css({
    height: '11rem',
    width: '11rem',
    backgroundColor: theme.colors.whiteTransparent,
    backgroundSize: 'cover !important',
    borderRadius: '15px',
    margin: '1rem',
    boxShadow: theme.shadows.basicShadow,
  }),
  button: css({
    borderRadius: '10px',
    width: '15rem',
    margin: '1rem 2rem',
    padding: '1rem 2rem',
    cursor: 'pointer',
    border: 'none',
    background: theme.colors.white,
    textTransform: 'uppercase',
    transition: theme.transitions.basicEaseIn,
    boxShadow: theme.shadows.basicShadow,
    '&:hover': {
      background: theme.colors.green,
    },
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
    id: 0,
  },
  {
    name: 'css',
    src: CssImg,
    id: 0,
  },
  {
    name: 'js',
    src: JsImg,
    id: 0,
  },

  {
    name: 'react',
    src: ReactImg,
    id: 0,
  },
  {
    name: 'gitlab',
    src: GitlabImg,
    id: 0,
  },
  {
    name: 'node',
    src: NodeImg,
    id: 0,
  },
  {
    name: 'webpack',
    src: WebpackImg,
    id: 0,
  },
  {
    name: 'typescript',
    src: TSImg,
    id: 0,
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
  revealCard: (card: Card) => void
  isReveal: boolean
  isGuessed: boolean
}

const cardsPack =
  cards &&
  cards.concat(cards).map((card, index) => {
    return { ...card, id: index + 1 }
  })

const maxScore = cardsPack.length / 2
const startRound = 0

const MemoryGameCard = (props: CardProps) => {
  return (
    <>
      <div>
        <img
          onClick={() => {
            if (!props.isGuessed || !props.isReveal) {
              props.revealCard(props.cardData)
            }
          }}
          css={[style.memoryGameCard, style.reveal, props.isGuessed ? style.guessed : undefined]}
          src={props.isReveal || props.isGuessed ? props.cardData.src : DefaultImg}
        />
      </div>
    </>
  )
}

export const MemoryGame = () => {
  const [playCards, setplayCards] = useState(cardsPack as Card[])
  const [revealCards, setRevealCards] = useState([] as [] | [Card] | [Card, Card])
  const [corretGuessed, setCorretGuessed] = useState([] as Card[])
  const [gameRound, setGameRound] = useState(0)

  const handleClickTip = (card: Card) => {
    setRevealCards([...revealCards, card] as [Card] | [Card, Card])
  }

  const setCorrectGuess = async () => {
    if (revealCards.length !== 2) return
    await pause(600)
    const [firstCard, secondCard] = revealCards
    if (firstCard.name === secondCard.name) {
      setCorretGuessed([...corretGuessed, firstCard])
      setRevealCards([])
      setGameRound(gameRound + 1)
    }
    setGameRound(gameRound + 1)
    setRevealCards([])
  }

  const getRevalCards = (id: number) => {
    setCorrectGuess()
    return revealCards.some(card => card.id === id)
  }

  const getCorrectCards = (name: string) => {
    return corretGuessed.some(card => card.name === name)
  }

  return (
    <div css={style.memoryGamePage}>
      <div css={style.column}>
        {gameRound === startRound && (
          <button
            css={style.button}
            onClick={() => {
              setplayCards(shuffle(cardsPack)), setGameRound(1)
            }}
          >
            Start Game
          </button>
        )}
        {corretGuessed.length === maxScore && (
          <button
            css={style.button}
            onClick={() => {
              setplayCards(shuffle(cardsPack)), setGameRound(1), setCorretGuessed([])
            }}
          >
            Restart Game
          </button>
        )}
        {gameRound !== startRound && (
          <>
            <div css={style.actualScore}>
              <h3>Skóre</h3>
              <p>{corretGuessed.length}</p>
            </div>
            <div css={style.actualRound}>
              <h3>Kolo</h3>
              <p>{gameRound}</p>
            </div>
          </>
        )}
      </div>
      <div css={style.gameBoard}>
        {playCards.map(card => (
          <MemoryGameCard
            key={card.id}
            cardData={card}
            revealCard={handleClickTip}
            isReveal={gameRound === startRound ? true : getRevalCards(card.id)}
            isGuessed={getCorrectCards(card.name)}
          />
        ))}
      </div>
    </div>
  )
}
