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
  const [article, setArticle] = useState(undefined as Article | undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const getArticleData = async () => {
    try {
      const data = await services.blog.getBySlug(slug!)
      setArticle(data)
    } catch (err) {
      setError('Article not found')
      console.info(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteArticle = async () => {
    try {
      await services.blog.deleteBySlug(slug!)
    } catch (err) {
      setError('Article not found')
      console.info(err)
    }
  }

  return {
    article,
    setArticle,
    getArticleData,
    loading,
    error,
    slug,
    deleteArticle,
    setLoading,
    setError,
  }
}

export const { ContextProvider: BlogArticlePageContextProvider, Context: BlogArticlePageContext } =
  genericHookContextBuilder(useLogicState)
