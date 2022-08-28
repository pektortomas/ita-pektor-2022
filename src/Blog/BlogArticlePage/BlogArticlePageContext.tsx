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
  const [articleData, setArticleData] = useState(undefined as Article | undefined)
  const [loading, setLoading] = useState(true)
  const [customError, setCustomError] = useState('')
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const getArticleData = async () => {
    try {
      const response = await fetch(serviceUrls.blog.getBySlug(slug!))
      if (await response.ok) {
        setArticleData(await response.json())
      } else {
        setCustomError('Article not found')
        throw new Error('Error in database')
      }
    } catch (err) {
      console.info(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteArticle = async () => {
    await fetch(serviceUrls.blog.deleteBySlug(slug!), {
      method: 'DELETE',
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
