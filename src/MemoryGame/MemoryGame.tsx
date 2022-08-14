import { css } from '@emotion/react'
import { theme } from '../util/theme'
import { useState } from 'react'
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
    backgroundImage: `url(${require('./cardImages/default.png')})`,
  }),
  guessed: css({
    opacity: '50%',
  }),
}

const cards = [
  {
    name: 'html',
    src: require('./cardImages/html.jpg'),
  },
  {
    name: 'html',
    src: require('./cardImages/html.jpg'),
  },
  {
    name: 'css',
    src: require('./cardImages/css.jpg'),
  },
  {
    name: 'css',
    src: require('./cardImages/css.jpg'),
  },
  {
    name: 'js',
    src: require('./cardImages/js.jpg'),
  },
  {
    name: 'js',
    src: require('./cardImages/js.jpg'),
  },
  {
    name: 'react',
    src: require('./cardImages/react.jpg'),
  },
  {
    name: 'react',
    src: require('./cardImages/react.jpg'),
  },
  {
    name: 'gitlab',
    src: require('./cardImages/gitlab.jpg'),
  },
  {
    name: 'gitlab',
    src: require('./cardImages/gitlab.jpg'),
  },
  {
    name: 'node',
    src: require('./cardImages/node.jpg'),
  },
  {
    name: 'node',
    src: require('./cardImages/node.jpg'),
  },
  {
    name: 'webpack',
    src: require('./cardImages/webpack.jpg'),
  },
  {
    name: 'webpack',
    src: require('./cardImages/webpack.jpg'),
  },
  {
    name: 'typescript',
    src: require('./cardImages/typescript.jpg'),
  },
  {
    name: 'typescript',
    src: require('./cardImages/typescript.jpg'),
  },
]

type Card = {
  name: string
  src: any
  id?: number
}

// inspired by https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffle = (a: Card[]) => {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

const setCardId = (cardsArray: Card[]) => {
  cardsArray.map((card, index) => (card.id = index + 1))
}

const MemoryGameCard = (props: any) => {
  return (
    <>
      <div>
        <img
          onClick={() =>
            props.isGuessed || props.isReveal ? undefined : props.revealCard(props.cardData)
          }
          css={[style.memoryGameCard, style.reveal, props.isGuessed ? style.guessed : undefined]}
          src={
            props.isReveal || props.isGuessed
              ? props.cardData.src
              : require('./cardImages/default.png')
          }
        />
      </div>
    </>
  )
}

export const MemoryGame = () => {
  const [playCards, setplayCards] = useState(cards as Card[])
  const [revealCards, setRevealCards] = useState([] as Card[])
  const [corretGuessed, setCorretGuessed] = useState([] as Card[])
  const [gameRound, setGameRound] = useState(0)

  const handleClickTip = (card: Card) => {
    setRevealCards([...revealCards, card])
  }

  const setCorrectGuess = () => {
    if (revealCards.length === 2) {
      setTimeout(() => {
        const [firstCard, secondCard] = revealCards
        if (firstCard.name === secondCard.name) {
          setCorretGuessed([...corretGuessed, firstCard])
          setRevealCards([])
          setGameRound(gameRound + 1)
        }
        setGameRound(gameRound + 1)
        setRevealCards([])
      }, 600)
    }
  }

  setCorrectGuess()

  const getRevalCards = (id: number | undefined) => {
    if (revealCards.some(e => e.id === id)) return true
  }

  const getCorrectCards = (name: string) => {
    if (corretGuessed.some((e: Card) => e.name === name)) return true
  }

  return (
    <div css={style.memoryGamePage}>
      <div css={style.column}>
        {gameRound === 0 && (
          <button
            css={style.button}
            onClick={() => [setCardId(cards), setplayCards(shuffle(cards)), setGameRound(1)]}
          >
            Start Game
          </button>
        )}
        {corretGuessed.length === 8 && (
          <button
            css={style.button}
            onClick={() => [
              setCardId(cards),
              setplayCards(shuffle(cards)),
              setGameRound(1),
              setCorretGuessed([]),
            ]}
          >
            Restart Game
          </button>
        )}
        {gameRound !== 0 && (
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
        {playCards.map((card, index) => (
          <MemoryGameCard
            key={index}
            cardData={card}
            revealCard={handleClickTip}
            isReveal={card.id ? getRevalCards(card.id) : true}
            isGuessed={getCorrectCards(card.name)}
          />
        ))}
      </div>
    </div>
  )
}
