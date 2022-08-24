import { BlogAppContext } from './BlogAppContext'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { theme } from '../util/theme'
import { urls } from '../util/urls'
import { useContext } from 'react'
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
  post: css({
    textAlign: 'center',
    background: theme.colors.whiteTransparent,
    padding: '3rem',
    borderRadius: '10px',
    width: '25rem',
  }),
  articleList: css({
    textAlign: 'center',
  }),
}

export const BlogPage = () => {
  const logic = useContext(BlogAppContext)
  return (
    <div css={style.blogPage}>
      <h1>React Blog</h1>
      <Link to={urls.blogApp.newArticle}>
        <button>Create new article</button>
      </Link>
      <div css={style.articleList}>
        <h4>Article List</h4>
        <div>
          {logic.article.map(article => (
            <div css={style.post} key={article.id}>
              <h3>{article.title}</h3>
              <Link to={`article/${article.slug}`}>
                <button>Show article</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
