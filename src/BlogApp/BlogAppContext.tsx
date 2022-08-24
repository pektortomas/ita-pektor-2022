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
  const [text, setText] = useState('')

  const createArticle = () => {
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
  }
}

export const { ContextProvider: BlogAppContextProvider, Context: BlogAppContext } =
  genericHookContextBuilder(useLogicState)
