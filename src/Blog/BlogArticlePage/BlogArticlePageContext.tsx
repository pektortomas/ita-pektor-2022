import { genericHookContextBuilder } from '../../util/genericHookContextBuilder'
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
  const [articleData, setArticleData] = useState(undefined as Article | undefined)
  const [loading, setLoading] = useState(true)
  const [customError, setCustomError] = useState('')
  const { slug } = useParams()

  const getArticleData = async () => {
    try {
      const response = await fetch(`http://localhost:1234/articles/${slug}`)
      setArticleData(await response.json())
    } catch (err) {
      if (err) setCustomError('Databáze je dočasně nedostupná')
    } finally {
      setLoading(false)
    }
  }

  const deleteArticle = async () => {
    await fetch(`http://localhost:1234/delete-article/${slug}`, {
      method: 'DELETE',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }),
    })
  }

  return {
    articleData,
    setArticleData,
    getArticleData,
    loading,
    customError,
    slug,
    deleteArticle,
  }
}

export const { ContextProvider: BlogArticlePageContextProvider, Context: BlogArticlePageContext } =
  genericHookContextBuilder(useLogicState)
