import { genericHookContextBuilder } from '../../util/genericHookContextBuilder'
import { getErrorMessage } from '../../util/helperFunctions'
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

type ErrorType = {
  errorType: 'Error in database' | 'Empty database' | 'No connection to database' | ''
  text: string
}

const useLogicState = () => {
  const [value, setValue] = useState('')
  const [articleData, setArticleData] = useState([] as Article[])
  const [filterArticles, setFilterArticles] = useState(articleData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ errorType: '', text: '' } as ErrorType)

  const getArticleData = async () => {
    try {
      setArticleData(await services.blog.getAll())
    } catch (err) {
      if (getErrorMessage(err) === 'Empty database') {
        setError({ errorType: 'Empty database', text: 'Create new article' })
      } else
        setError({
          errorType: 'Error in database',
          text: 'Please clone GIT repository to your local machine to run this app',
        })
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
