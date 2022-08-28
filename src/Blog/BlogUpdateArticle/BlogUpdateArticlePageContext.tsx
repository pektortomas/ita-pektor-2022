import { genericHookContextBuilder } from '../../util/genericHookContextBuilder'
import { serviceUrls } from '../../util/backendUrls'
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
  const [customError, setCustomError] = useState('')
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [text, setText] = useState('')
  const [textError, setTextError] = useState('')
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const getArticleData = async () => {
    try {
      const response = await fetch(serviceUrls.blog.getBySlug(slug!))
      const responseJson = (await response.json()) as Article
      setTitle(await responseJson.body.title)
      setText(await responseJson.body.text)
    } catch (err) {
      setCustomError('Database is temporarily unavailable')
    } finally {
      setLoading(false)
    }
  }

  const updateArticleData = async () => {
    const payload = { title: title, text: text }
    await fetch(serviceUrls.blog.updateBySllug(slug!), {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(payload),
    })
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
    customError,
    loading,
  }
}

export const {
  ContextProvider: BlogUpdateArticlePageContextProvider,
  Context: BlogUpdateArticlePageContext,
} = genericHookContextBuilder(useLogicState)
