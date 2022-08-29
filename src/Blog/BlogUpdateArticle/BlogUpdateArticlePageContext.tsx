import { genericHookContextBuilder } from '../../util/genericHookContextBuilder'
import { services } from '../../util/serviceLayer'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

type Article = {
  id: number
  slug: string
  body: {
    title: string
    text: string
  }
}

const useLogicState = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [text, setText] = useState('')
  const [textError, setTextError] = useState('')
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const getArticleData = async () => {
    try {
      const response = (await services.blog.getBySlug(slug!)) as Article
      setTitle(await response.body.title)
      setText(await response.body.text)
    } catch (err) {
      setError('Database is temporarily unavailable')
    } finally {
      setLoading(false)
    }
  }

  const updateArticleData = async () => {
    const payload = { title, text }
    await services.blog.updateBySlug(slug!, payload)
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
      await updateArticleData()
      setTitle('')
      setText('')
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
