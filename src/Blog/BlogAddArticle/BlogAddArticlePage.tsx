import { BlogAddArticleContext } from './BlogAddArticleContext'
import { BlogAppContext } from '../Blogapp/BlogAppContext'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from '../../util/theme'
import { urls } from '../../util/urls'
import { useContext } from 'react'
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
      height: '100vh',
    },
  }),
  subHeading: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.3rem',
  }),
  error: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.2rem',
    color: theme.colors.red,
  }),
  formContainer: css({
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '30%',
    height: '90vh',
  }),
  form: css({
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    margin: '0 auto',
  }),
  textarea: css({
    height: '30vh',
    width: '95%',
    borderRadius: theme.borderRadius.small,
    resize: 'none',
    outline: 'none',
    padding: '1rem',
    textAlign: 'center',
    letterSpacing: '.2rem',
    marginBottom: '2rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '18rem',
    },
  }),
  input: css({
    display: 'flex',
    outline: 'none',
    border: `none`,
    width: '100%',
    height: '3rem',
    justifyContent: 'space-around',
    margin: '2rem 0',
    borderRadius: theme.borderRadius.small,
    textAlign: 'center',
    letterSpacing: '.2rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '20rem',
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

export const BlogAddArticlePage = () => {
  const logic = useContext(BlogAddArticleContext)

  return (
    <div css={style.blogPage}>
      <Link to={urls.blogApp.blogPage}>
        <StyledBackButton>Back to blog</StyledBackButton>
      </Link>
      <div css={style.formContainer}>
        <form
          css={style.form}
          onSubmit={e => {
            e.preventDefault()
            logic.createArticle()
          }}
        >
          {logic.titleError ? (
            <h3 css={style.error}>{logic.titleError}</h3>
          ) : (
            <h3 css={style.subHeading}>Title</h3>
          )}

          <input
            css={style.input}
            onChange={e => logic.setTitle(e.target.value)}
            value={logic.title}
            type='text'
          />

          {logic.textError ? (
            <h3 css={style.error}>{logic.textError}</h3>
          ) : (
            <h3 css={style.subHeading}>Text</h3>
          )}

          <textarea
            onChange={e => logic.setText(e.target.value)}
            value={logic.text}
            css={style.textarea}
          />
          <StyledBackButton type='submit'>Create article</StyledBackButton>
        </form>
      </div>
    </div>
  )
}
