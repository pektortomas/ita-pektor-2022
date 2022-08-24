import { BlogAppContext } from './BlogAppContext'
import { Link, useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from '../util/theme'
import { urls } from '../util/urls'
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
    textAlign: 'center',
    display: 'inline',
    maxWidth: '50%',
    overflow: 'hidden',
    wordBreak: 'break-word',
  }),
}

export const BlogArticlePage = () => {
  const logic = useContext(BlogAppContext)
  const { slug } = useParams()
  const filteredArticle = logic.article.find(article => article.slug === slug)

  return (
    <div css={style.blogPage}>
      <Link to={urls.blogApp.blogPage}>
        <button>Back to blog</button>
      </Link>
      <div css={style.article}>
        <h1>{filteredArticle?.title}</h1>
        {filteredArticle ? <ReactMarkdown>{filteredArticle.text}</ReactMarkdown> : ''}
      </div>
    </div>
  )
}
