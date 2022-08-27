export const backendFilterUrl = (filterValue: string) => {
  return `${process.env.REACT_APP_HTTP_FILTER_URL}?search=${filterValue}`
}
export const BEblogFilterUrl = (filterValue: string) => {
  return `${process.env.REACT_APP_BLOG_FILTER_URL}?search=${filterValue}`
}
