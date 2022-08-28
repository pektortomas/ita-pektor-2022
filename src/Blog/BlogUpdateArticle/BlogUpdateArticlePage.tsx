import { BlogUpdateArticlePageContext } from './BlogUpdateArticlePageContext'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
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
  formContainer: css({
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '90vh',
  }),
  form: css({
    display: 'flex',
    flexDirection: 'column',
    width: '25rem',
    margin: '0 auto',
  }),
  textarea: css({
    height: '30vh',
  }),
}

export const BlogUpdateArticlePage = () => {
  const logic = useContext(BlogUpdateArticlePageContext)
  useComponentDidMount(logic.getArticleData)

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
        <div css={style.formContainer}>
          <form
            css={style.form}
            onSubmit={e => {
              logic.updateArticle()
            }}
          >
            <label>Title</label>
            {logic.titleError}
            <input onChange={e => logic.setTitle(e.target.value)} value={logic.title} type='text' />
            <label>Text</label>
            {logic.textError}
            <textarea
              onChange={e => logic.setText(e.target.value)}
              value={logic.text}
              css={style.textarea}
            />
            <button type='submit'>Save</button>
          </form>
        </div>
      )}
    </div>
  )
}
