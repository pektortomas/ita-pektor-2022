import { Link, useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import { generateID, useLocalStorage } from '../util/helperFunctions'
import { genericHookContextBuilder } from '../util/genericHookContextBuilder'
import { theme } from '../util/theme'
import { urls } from '../util/urls'
import { useContext, useState } from 'react'
import ReactMarkdown from 'react-markdown'
/** @jsxImportSource @emotion/react */

type Article = {
  id: number
  title: string
  text: string
  slug: string
}

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
  article: css({
    textAlign: 'center',
    display: 'inline',
    maxWidth: '50%',
    overflow: 'hidden',
    wordBreak: 'break-word',
  }),
}

const useLogicState = () => {
  const [article, setArticle] = useLocalStorage('article', [] as Article[])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const generateSlug = (textToSlug: string) => {
    return `${textToSlug.toLowerCase().replace(/\W+/g, '-')}-${generateID()}`
  }

  return {
    article,
    setArticle,
    title,
    setTitle,
    text,
    setText,
    generateSlug,
  }
}

export const { ContextProvider: BlogAppContextProvider, Context: BlogAppContext } =
  genericHookContextBuilder(useLogicState)

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

export const BlogAddArticlePage = () => {
  const logic = useContext(BlogAppContext)

  return (
    <div css={style.blogPage}>
      <Link to={urls.blogApp.blogPage}>
        <button>Back to blog</button>
      </Link>
      <div css={style.formContainer}>
        <form css={style.form}>
          <label>Title</label>
          <input onChange={e => logic.setTitle(e.target.value)} value={logic.title} type='text' />
          <label>Text</label>
          <textarea
            onChange={e => logic.setText(e.target.value)}
            value={logic.text}
            css={style.textarea}
          />
          <button
            type='submit'
            onClick={e => {
              e.preventDefault()
              logic.setArticle([
                {
                  id: generateID(),
                  title: logic.title,
                  text: logic.text,
                  slug: logic.generateSlug(logic.title),
                },
                ...logic.article,
              ])
              logic.setTitle('')
              logic.setText('')
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

// <Route path="/:slug" component={About} />
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
