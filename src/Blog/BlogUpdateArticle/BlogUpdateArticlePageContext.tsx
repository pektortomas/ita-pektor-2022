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
    services.blog.updateBySlug(slug!, payload)
  }

  const updateArticle = () => {
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

    updateArticleData()
    setTitle('')
    setText('')
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
  }
}

export const {
  ContextProvider: BlogUpdateArticlePageContextProvider,
  Context: BlogUpdateArticlePageContext,
} = genericHookContextBuilder(useLogicState)
