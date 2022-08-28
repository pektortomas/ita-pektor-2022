import { genericHookContextBuilder } from '../../util/genericHookContextBuilder'
import { serviceUrls } from '../../util/backendUrls'
import { useState } from 'react'

const useLogicState = () => {
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [text, setText] = useState('')
  const [textError, setTextError] = useState('')

  const setNewArticleData = async () => {
    const payload = { title, text }
    await fetch(serviceUrls.blog.getAll, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(payload),
    })
  }

  const createArticle = () => {
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

    setNewArticleData()
    setTitle('')
    setText('')
  }

  return {
    title,
    setTitle,
    text,
    setText,
    createArticle,
    titleError,
    textError,
  }
}

export const { ContextProvider: BlogAddArticleContextProvider, Context: BlogAddArticleContext } =
  genericHookContextBuilder(useLogicState)
