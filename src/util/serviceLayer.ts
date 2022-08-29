const apiURL = process.env.REACT_APP_BLOG_BACKEND_URL

export const services = {
  httpFilter: {
    filter: async (filterValue: string) => {
      const response = await fetch(`${apiURL}http-filter?search=${filterValue}`)
      if (!response.ok) throw new Error('Error in database')
      return await response.json()
    },
  },
  blog: {
    filter: async (filterValue: string) => {
      const response = await fetch(`${apiURL}blog-filter?search=${filterValue}`)
      if (!response.ok) throw new Error('Error in database')
      return await response.json()
    },
    getBySlug: async (slug: string) => {
      const response = await fetch(`${apiURL}articles/${slug}`)
      if (!response.ok) throw new Error('Error in database')
      return await response.json()
    },
    deleteBySlug: async (slug: string) => {
      const response = await fetch(`${apiURL}delete-article/${slug}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Error in database 1')
      return await response
    },
    updateBySlug: async (slug: string, body: {}) => {
      const response = await fetch(`${apiURL}update-article/${1}`, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify(body),
      })
      if (!response.ok) throw new Error('Error in database')
      return await response
    },
    getAll: async () => {
      const response = await fetch(`${apiURL}articles`)
      if (!response.ok) throw new Error('Error in database')
      return await response.json()
    },
    setNew: async (body: {}) => {
      const response = await fetch(`${apiURL}articles`, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify(body),
      })
      if (!response.ok) throw new Error('Error in database')
      return await response.json()
    },
  },
}
