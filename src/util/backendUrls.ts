export const backendFilterUrl = (filterValue: string) => {
  return `${process.env.REACT_APP_HTTP_FILTER_URL}?search=${filterValue}`
}
export const backendBlogFilterUrl = (filterValue: string) => {
  return `${process.env.REACT_APP_BLOG_BACKEND_URL}blog-filter?search=${filterValue}`
}
export const backendBlogGetBySlugUrl = (slug: string) => {
  return `${process.env.REACT_APP_BLOG_BACKEND_URL}articles/${slug}`
}
export const backendBlogDeleteBySlugUrl = (slug: string) => {
  return `${process.env.REACT_APP_BLOG_BACKEND_URL}delete-article/${slug}`
}
export const backendBlogUpdateBySlugUrl = (slug: string) => {
  return `${process.env.REACT_APP_BLOG_BACKEND_URL}update-article/${slug}`
}
export const beckendUrls = {
  getArticles: `${process.env.REACT_APP_BLOG_BACKEND_URL}articles`,
}
