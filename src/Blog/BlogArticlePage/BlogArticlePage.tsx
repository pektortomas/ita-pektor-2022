import { BlogArticlePageContext } from './BlogArticlePageContext'
import { Link, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from '../../util/theme'
import { urls } from '../../util/urls'
import { useComponentDidMount } from '../../util/helperFunctions'
import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
/** @jsxImportSource @emotion/react */

const style = {
  blogPage: css({
    background: theme.colors.lightReactBlue,
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  article: css({
    background: theme.colors.white,
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
  }),
}

export const BlogArticlePage = () => {
  const logic = useContext(BlogArticlePageContext)
  useComponentDidMount(logic.getArticleData)
  let navigate = useNavigate()

  return (
    <div css={style.blogPage}>
      <Link to={urls.blogApp.blogPage}>
        <button>Back to blog</button>
      </Link>
      {logic.error.length > 0 ? (
        <div>{logic.error}</div>
      ) : logic.loading ? (
        <p>...Loading</p>
      ) : (
        <div css={style.article}>
          <h1>{logic.article?.body.title}</h1>
          <ReactMarkdown>{logic.article!.body.text}</ReactMarkdown>
        </div>
      )}
      <Link to={urls.blogApp.setAarticleUpdate(logic.slug!)}>
        <button>Update article</button>
      </Link>
      <button
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
      </button>
    </div>
  )
}
