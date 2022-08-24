import { generateID, generateSlug, useLocalStorage } from '../util/helperFunctions'
import { genericHookContextBuilder } from '../util/genericHookContextBuilder'
import { useState } from 'react'

type Article = {
  id: number
  title: string
  text: string
  slug: string
}

const useLogicState = () => {
  const [article, setArticle] = useLocalStorage('article', [] as Article[])
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [text, setText] = useState('')
  const [textError, setTextError] = useState('')

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

    setArticle([
      {
        id: generateID(),
        title: title,
        text: text,
        slug: generateSlug(title),
      },
      ...article,
    ])
    setTitle('')
    setText('')
  }

  return {
    article,
    setArticle,
    title,
    setTitle,
    text,
    setText,
    createArticle,
    titleError,
    textError,
  }
}

export const { ContextProvider: BlogAppContextProvider, Context: BlogAppContext } =
  genericHookContextBuilder(useLogicState)
