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
  const [articleData, setArticleData] = useState(undefined as Article | undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const getArticleData = async () => {
    try {
      setArticleData(await services.blog.getBySlug(slug!))
    } catch (err) {
      setError('Article not found')
      console.info(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteArticle = async () => services.blog.deleteBySlug(slug!)

  return {
    articleData,
    setArticleData,
    getArticleData,
    loading,
    error,
    slug,
    deleteArticle,
  }
}

export const { ContextProvider: BlogArticlePageContextProvider, Context: BlogArticlePageContext } =
  genericHookContextBuilder(useLogicState)
