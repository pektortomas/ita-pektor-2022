import { BlogAppContext } from './BlogAppContext'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { serviceUrls } from '../../util/backendUrls'
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
    background: theme.colors.whiteTransparent,
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
                const response = await fetch(serviceUrls.blog.filter(e.target.value))
                logic.setFilterArticles(await response.json())
              } catch (err) {
                logic.setCustomError('Database is temporarily unavailable')
              } finally {
                logic.setLoading(false)
              }
            }}
          />
        </div>
        {logic.customError.length > 0 ? (
          <div>{logic.customError}</div>
        ) : logic.loading ? (
          <p>...Loading</p>
        ) : logic.articleData.length < 1 ? (
          <p>Vytvořte svůj první článek</p>
        ) : logic.value.length > 0 ? (
          logic.filterArticles.map(article => (
            <div css={style.post} key={article.id}>
              <h3>{article.body.title}</h3>
              <p>Jsem z BE</p>
              <Link to={urls.blogApp.getAarticleDetail(article.slug)}>
                <button>Show article</button>
              </Link>
            </div>
          ))
        ) : (
          logic.articleData.map(article => (
            <div css={style.post} key={article.id}>
              <h3>{article.body.title}</h3>
              <p>Jsem z BE</p>
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
