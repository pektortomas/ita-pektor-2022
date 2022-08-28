import { genericHookContextBuilder } from '../../util/genericHookContextBuilder'
import { serviceUrls } from '../../util/backendUrls'
import { useState } from 'react'

const useLogicState = () => {
  const [value, setValue] = useState('')
  const [articleData, setArticleData] = useState([] as any[])
  const [filterArticles, setFilterArticles] = useState(articleData)
  const [loading, setLoading] = useState(true)
  const [customError, setCustomError] = useState('')

  const getArticleData = async () => {
    try {
      const response = await fetch(serviceUrls.blog.getAll)
      if (await response.ok) {
        setArticleData(await response.json())
      } else {
        setCustomError('Database is temporarily unavailable')
        throw new Error('Error in database')
      }
    } catch (err) {
      console.info(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    articleData,
    getArticleData,
    loading,
    customError,
    value,
    setValue,
    setLoading,
    setFilterArticles,
    filterArticles,
    setCustomError,
  }
}

export const { ContextProvider: BlogAppContextProvider, Context: BlogAppContext } =
  genericHookContextBuilder(useLogicState)
