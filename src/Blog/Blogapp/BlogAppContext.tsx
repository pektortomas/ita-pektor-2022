import { genericHookContextBuilder } from '../../util/genericHookContextBuilder'
import { services } from '../../util/serviceLayer'
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
  const [value, setValue] = useState('')
  const [articleData, setArticleData] = useState([] as Article[])
  const [filterArticles, setFilterArticles] = useState(articleData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getArticleData = async () => {
    try {
      setArticleData(await services.blog.getAll())
    } catch (err) {
      setError('Database is temporarily unavailable')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    articleData,
    getArticleData,
    loading,
    error,
    value,
    setValue,
    setLoading,
    setFilterArticles,
    filterArticles,
    setError,
  }
}

export const { ContextProvider: BlogAppContextProvider, Context: BlogAppContext } =
  genericHookContextBuilder(useLogicState)
