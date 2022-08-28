const apiURL = process.env.REACT_APP_BLOG_BACKEND_URL

export const serviceUrls = {
  httpFilter: {
    filter: (filterValue: string) => `${apiURL}http-filter?search=${filterValue}`,
  },
  blog: {
    filter: (filterValue: string) => `${apiURL}blog-filter?search=${filterValue}`,
    getBySlug: (slug: string) => `${apiURL}articles/${slug}`,
    deleteBySlug: (slug: string) => `${apiURL}delete-article/${slug}`,
    updateBySllug: (slug: string) => `${apiURL}update-article/${slug}`,
    getAll: `${apiURL}articles`,
  },
}
