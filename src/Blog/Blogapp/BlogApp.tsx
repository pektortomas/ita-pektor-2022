import { BlogAppContext } from './BlogAppContext'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { services } from '../../util/serviceLayer'
import { theme } from '../../util/theme'
import { urls } from '../../util/urls'
import { useComponentDidMount } from '../../util/helperFunctions'
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
    background: theme.colors.white_transparent,
    padding: '3rem',
    borderRadius: '10px',
    width: '25rem',
  }),
  articleList: css({
    textAlign: 'center',
    width: '50%',
  }),
  search: css({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    margin: '2rem 0',
  }),
}

export const BlogPage = () => {
  const logic = useContext(BlogAppContext)
  useComponentDidMount(logic.getArticleData)

  return (
    <div css={style.blogPage}>
      <h1>React Blog</h1>
      <Link to={urls.blogApp.newArticle}>
        <button>Create new article</button>
      </Link>
      <div css={style.articleList}>
        <h4>Article List</h4>
        <div css={style.search}>
          <p>Vyhledat článek</p>
          <input
            type='text'
            value={logic.value}
            onChange={async e => {
              logic.setValue(e.target.value)
              try {
                logic.setLoading(true)
                logic.setFilterArticles(await services.blog.filter(e.target.value))
              } catch (err) {
                logic.setError('Database is temporarily unavailable')
              } finally {
                logic.setLoading(false)
              }
            }}
          />
        </div>
        {logic.error.length > 0 ? (
          <div>{logic.error}</div>
        ) : logic.loading ? (
          <p>...Loading</p>
        ) : logic.articleData.length < 1 ? (
          <p>Vytvořte svůj první článek</p>
        ) : logic.value.length > 0 ? (
          logic.filterArticles.map(article => (
            <div css={style.post} key={article.id}>
              <h3>{article.body.title}</h3>
              <Link to={urls.blogApp.getAarticleDetail(article.slug)}>
                <button>Show article</button>
              </Link>
            </div>
          ))
        ) : (
          logic.articleData.map(article => (
            <div css={style.post} key={article.id}>
              <h3>{article.body.title}</h3>
              <Link to={urls.blogApp.getAarticleDetail(article.slug)}>
                <button>Show article</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
