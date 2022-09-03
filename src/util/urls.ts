export const urls = {
  home: '/',
  jsHistory: '/js-history',
  counterApp: '/counter',
  hackerTyper: '/hacker-typer',
  todoApp: '/todo-app',
  todoAppRedux: '/todo-app-redux',
  memoryGame: '/memory-game',
  mortgageCalculator: '/mortgage-calculator',
  httpFilter: '/http-filter',
  blogApp: {
    blogPage: '/blog',
    newArticle: '/blog/new-article',
    articleDetail: '/blog/article/:slug',
    getAarticleDetail: (slug: string) => `article/${slug}`,
    updateArticle: '/blog/update-article/:slug',
    setAarticleUpdate: (slug: string) => `/blog/update-article/${slug}`,
  },
} as const
