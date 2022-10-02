import { BlogAppContext } from './BlogAppContext'
import { ErrorCallback } from 'typescript'
import { HashLink } from 'react-router-hash-link'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { customClasses, theme } from '../../util/theme'
import { services } from '../../util/serviceLayer'
import { urls } from '../../util/urls'
import { useComponentDidMount } from '../../util/helperFunctions'
import { useContext } from 'react'
import logo from '../../img/logTP.svg'
import styled from '@emotion/styled'

/** @jsxImportSource @emotion/react */

const style = {
  blogPage: css({
    minHeight: '100vh',
    maxHeight: '100%',
    background: theme.colors.main_grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  post: css({
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: theme.colors.whiteTransparent,
    padding: '3rem',
    borderRadius: '10px',
    width: '30rem',
    margin: '1rem 0',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '23rem',
    },
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '20rem',
    },
  }),
  articleList: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '50%',
    marginTop: '2rem',
  }),
  articleListHeading: css({
    fontSize: '1.5rem',
    textTransform: 'uppercase',
  }),
  errorListHeading: css({
    fontSize: '5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.8rem',
    color: theme.colors.reactBlue,
  }),
  error: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7rem',
  }),
  search: css({
    display: 'flex',
    width: '50%',
    justifyContent: 'space-around',
    margin: '2rem 0',
  }),
  searchInput: css({
    display: 'flex',
    outline: 'none',
    border: `${theme.colors.reactBlue} 3px solid`,
    width: '60%',
    height: '3rem',
    justifyContent: 'space-around',
    margin: '2rem 0',
    borderRadius: '2rem',
    textAlign: 'center',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
    },
  }),
  logo: css({
    width: '4rem',
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '3rem',
      marginBottom: '1rem',
    },
  }),
  topRow: css({
    display: 'flex',
    width: '90%',
    justifyContent: 'space-between',
    padding: '3rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '2rem 0 0 0 ',
      justifyContent: 'center',
    },
  }),
  heading: css({
    margin: '1rem 0',
  }),
  link: css({
    textDecoration: 'none',
  }),
  reactText: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.5rem',
    color: theme.colors.reactBlue,
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
    margin: '0 auto',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
    },
  }),
  clickButton: css({
    background: theme.colors.main_grey,
    border: 'none',
    width: '10rem',
    height: '2.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: theme.shadows.out,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    justifyContent: 'center',
    padding: '.3rem',
    margin: '0 1rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      margin: '.5rem 0',
    },
  }),
  innerButton: css({
    background: theme.colors.main_grey,
    border: '1px solid',
    color: theme.colors.white,
    borderColor: theme.colors.dark_grey,
    boxShadow: theme.shadows.inOut,
    textDecoration: 'none',
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

const StyledMainHeading = styled.h1({
  fontWeight: 'bolder',
  textTransform: 'uppercase',
  fontSize: '1.5rem',
  letterSpacing: '.3rem',
  margin: '1rem 0',
})

export const BlogPage = () => {
  const logic = useContext(BlogAppContext)
  useComponentDidMount(logic.getArticleData)

  return (
    <div css={style.blogPage}>
      <Helmet>
        <title>Blog CRUD App</title>
        <meta
          name='description'
          content='Simple blog app with CRUD Backend. FE allows search, creating, updating, read and delete articles. Article allows markdown.'
        />
        <link rel='canonical' href='http://tomaspektor.cz/todo-app' />
      </Helmet>
      <div css={style.topRow}>
        <HashLink to={urls.portfolioHash} css={customClasses.tabletHidden}>
          <StyledBackButton>Back to Home Page</StyledBackButton>
        </HashLink>
        <img css={style.logo} src={logo} />
      </div>
      <div css={style.content}>
        <div css={style.heading}>
          <StyledMainHeading>Blog CRUD Ap</StyledMainHeading>
          <span css={style.reactText}>Simple CRUD Blog app with backend</span>
        </div>

        {logic.error.errorType === 'Error in database' ? (
          <h4 css={style.errorListHeading}>Caution!</h4>
        ) : logic.loading ? (
          <h1 css={style.articleListHeading}>Please wait</h1>
        ) : (
          <>
            {logic.error.errorType !== 'Empty database' ? (
              <div css={style.search}>
                <input
                  css={style.searchInput}
                  type='text'
                  placeholder='Search article...'
                  value={logic.value}
                  onChange={async e => {
                    logic.setValue(e.target.value)
                    try {
                      logic.setLoading(true)
                      logic.setFilterArticles(await services.blog.filter(e.target.value))
                    } catch (err) {
                      logic.setError({
                        errorType: 'No connection to database',
                        text: 'Database is temporarily unavailable',
                      })
                    } finally {
                      logic.setLoading(false)
                    }
                  }}
                />
              </div>
            ) : (
              <div></div>
            )}
            <Link to={urls.blogApp.newArticle}>
              <StyledBackButton>Create new article</StyledBackButton>
            </Link>
          </>
        )}

        <div css={style.articleList}>
          {logic.error.errorType === 'Error in database' ? (
            <div css={style.error}>
              {logic.error.text}
              <a href={urls.gitHubBlog}>
                <StyledBackButton>Go to GIT</StyledBackButton>
              </a>
            </div>
          ) : logic.loading ? (
            <p>...Loading</p>
          ) : logic.articleData.length < 1 ? (
            <h1 css={style.articleListHeading}>Vytvořte svůj první článek</h1>
          ) : logic.value.length > 0 ? (
            <>
              <h4 css={style.articleListHeading}>Article List</h4>
              {logic.filterArticles.map(article => (
                <div css={style.post} key={article.id}>
                  <h3>{article.body.title}</h3>
                  <Link css={style.link} to={urls.blogApp.getAarticleDetail(article.slug)}>
                    <div css={style.clickButton}>
                      <button css={style.innerButton}>Show article</button>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <>
              <h4 css={style.articleListHeading}>Article List</h4>
              {logic.articleData.map(article => (
                <div css={style.post} key={article.id}>
                  <h3>{article.body.title}</h3>
                  <Link to={urls.blogApp.getAarticleDetail(article.slug)}>
                    <div css={style.clickButton}>
                      <button css={style.innerButton}>Show article</button>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
