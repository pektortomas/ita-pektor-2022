import { genericHookContextBuilder } from '../../util/genericHookContextBuilder'
import { services } from '../../util/serviceLayer'
import { urls } from '../../util/urls'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const useLogicState = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [text, setText] = useState('')
  const [textError, setTextError] = useState('')
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  let navigate = useNavigate()

  const getArticleData = async () => {
    try {
      const response = await services.blog.getBySlug(slug!)
      setTitle(await response.body.title)
      setText(await response.body.text)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  const updateArticle = async () => {
    setTitleError('')
    setTextError('')

    if (title === '') {
      setTitleError('Zadejte prosím název článku')
      return
    }
    if (title.length < 3) {
      setTitleError('Název článku musí obsahovat alespoň 3 znaky')
      return
    }
    if (text === '') {
      setTextError('Zadejte prosím text článku')
      return
    }
    if (text.length < 3) {
      setTextError('Článek musí obsahovat alespoň 3 znaky')
      return
    }

    try {
      setLoading(true)
      const payload = { title, text }
      await services.blog.updateBySlug(slug!, payload)
      setTitle('')
      setText('')
      navigate(urls.blogApp.blogPage)
    } catch (err) {
      console.error(err)
      setError('Database is temporarily unavailable')
    } finally {
      setLoading(false)
    }
  }

  return {
    title,
    setTitle,
    text,
    setText,
    titleError,
    updateArticle,
    textError,
    getArticleData,
    slug,
    setError,
    loading,
    error,
    setLoading,
  }
}

export const {
  ContextProvider: BlogUpdateArticlePageContextProvider,
  Context: BlogUpdateArticlePageContext,
} = genericHookContextBuilder(useLogicState)
