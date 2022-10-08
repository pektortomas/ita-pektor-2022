import { BlogArticlePageContext } from './BlogArticlePageContext'
import { Link, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from '../../util/theme'
import { urls } from '../../util/urls'
import { useComponentDidMount } from '../../util/helperFunctions'
import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'
/** @jsxImportSource @emotion/react */

const style = {
  blogPage: css({
    maxWidth: '100vw',
    height: '100%',
    minHeight: '100vh',
    background: theme.colors.main_grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.colors.white,
    overflow: 'hidden',
    scrollSnapAlign: 'start',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      maxWidth: '100vw',
      paddingBottom: '3rem',
      position: 'relative',
      justifyContent: 'flex-start',
      minHeight: '-webkit-fill-available',
    },
  }),
  article: css({
    background: theme.colors.dark_grey,
    borderRadius: '15px',
    textAlign: 'center',
    display: 'inline',
    padding: '2rem',
    margin: '2rem 0',
    minWidth: '30rem',
    maxWidth: '50%',
    height: '40rem',
    overflow: 'hidden',
    wordBreak: 'break-word',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      minWidth: '26rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      minWidth: '20rem',
    },
  }),
  heading: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '2rem',
    letterSpacing: '.3rem',
  }),
  text: css({
    fontWeight: 'light',
    fontSize: '0.8rem',
    letterSpacing: '.3rem',
  }),
  buttonRow: css({
    width: '30%',
    display: 'flex',
    justifyContent: 'space-evenly',
    [`@media (max-width: ${theme.mediaMaxSizes.desktop})`]: {
      width: '60%',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
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
  transition: theme.transitions.allEaseOut,
  '&:hover': {
    filter: theme.glows.reactGlowSVG,
  },
  [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
    margin: '2rem 0',
  },
})
const StyledUpdateButton = styled.button({
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
  transition: theme.transitions.allEaseOut,
  '&:hover': {
    filter: theme.glows.reactGlowSVG,
  },
  [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
    margin: '2rem 0',
  },
})
const StyledRedButton = styled.button({
  background: theme.colors.red,
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
  transition: theme.transitions.allEaseOut,
  '&:hover': {
    filter: theme.glows.reactGlowSVG,
  },
  [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
    margin: '2rem 0',
  },
})

export const BlogArticlePage = () => {
  const logic = useContext(BlogArticlePageContext)
  useComponentDidMount(logic.getArticleData)
  let navigate = useNavigate()

  return (
    <div css={style.blogPage}>
      <Link to={urls.blogApp.blogPage}>
        <StyledBackButton>Back to blog</StyledBackButton>
      </Link>
      {logic.error.length > 0 ? (
        <div>{logic.error}</div>
      ) : logic.loading ? (
        <p>...Loading</p>
      ) : (
        <div css={style.article}>
          <h1 css={style.heading}>{logic.article?.body.title}</h1>
          <ReactMarkdown css={style.text}>{logic.article!.body.text}</ReactMarkdown>
        </div>
      )}
      <div css={style.buttonRow}>
        <Link to={urls.blogApp.setAarticleUpdate(logic.slug!)}>
          <StyledUpdateButton>Update article</StyledUpdateButton>
        </Link>
        <StyledRedButton
          onClick={async () => {
            try {
              logic.setLoading(true)
              await logic.deleteArticle()
              navigate(urls.blogApp.blogPage)
            } catch (err) {
              logic.setError('Database is temporarily unavailable')
            } finally {
              logic.setLoading(false)
            }
          }}
        >
          Delete article
        </StyledRedButton>
      </div>
    </div>
  )
}
