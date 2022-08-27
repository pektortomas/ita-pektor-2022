import { genericHookContextBuilder } from '../../util/genericHookContextBuilder'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const useLogicState = () => {
  const [value, setValue] = useState('')
  const [articleData, setArticleData] = useState([] as any[])
  const [filterArticles, setFilterArticles] = useState(articleData)
  const [loading, setLoading] = useState(true)
  const [customError, setCustomError] = useState('')
  const { slug } = useParams()

  const getArticleData = async () => {
    try {
      const response = await fetch('http://localhost:1234/articles')
      setArticleData(await response.json())
    } catch (err) {
      if (err) setCustomError('Vytvořte svůj první článek')
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
