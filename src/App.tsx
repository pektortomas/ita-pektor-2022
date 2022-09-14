import { BlogAddArticleContextProvider } from './Blog/BlogAddArticle/BlogAddArticleContext'
import { BlogAddArticlePage } from './Blog/BlogAddArticle/BlogAddArticlePage'
import { BlogAppContextProvider } from './Blog/Blogapp/BlogAppContext'
import { BlogArticlePage } from './Blog/BlogArticlePage/BlogArticlePage'
import { BlogArticlePageContextProvider } from './Blog/BlogArticlePage/BlogArticlePageContext'
import { BlogPage } from './Blog/Blogapp/BlogApp'
import { BlogUpdateArticlePage } from './Blog/BlogUpdateArticle/BlogUpdateArticlePage'
import {
  BlogUpdateArticlePageContext,
  BlogUpdateArticlePageContextProvider,
} from './Blog/BlogUpdateArticle/BlogUpdateArticlePageContext'
import { Counter } from './Counter/Counter'
import { Global, css, jsx } from '@emotion/react'
import { HackerTyper } from './HackerTyper/HackerTyper'
import { Home } from './Home'
import { HttpFilter } from './HttpFilter/HttpFilter'
import { JSHistory } from './JSHistory/JSHistory'
import { MemoryGame } from './MemoryGame/MemoryGame'
import { MortgageCalculator } from './MortgageCalculator/MortgageCalculator'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { TodoApp } from './TodoApp/TodoApp'
import { TodoAppRedux } from './TodoAppRedux/TodoAppRedux'
import { store } from './store'
import { theme } from './util/theme'
import { urls } from './util/urls'
/** @jsxImportSource @emotion/react */

const GlobalStyles = css({
  '& *': {
    fontFamily: 'sans-serif',
  },
  body: {
    margin: '0px',
    padding: '0px',
    boxSizing: 'border-box',
  },
})

function App() {
  return (
    <Router>
      <Global styles={GlobalStyles} />
      <Routes>
        <Route path={urls.home} element={<Home />} />
        <Route path={urls.jsHistory} element={<JSHistory />} />
        <Route path={urls.counterApp} element={<Counter />} />
        <Route path={urls.hackerTyper} element={<HackerTyper />} />
        <Route path={urls.todoApp} element={<TodoApp />} />
        <Route
          path={urls.todoAppRedux}
          element={
            <Provider store={store}>
              <TodoAppRedux />
            </Provider>
          }
        />
        <Route path={urls.memoryGame} element={<MemoryGame />} />
        <Route path={urls.mortgageCalculator} element={<MortgageCalculator />} />
        <Route path={urls.httpFilter} element={<HttpFilter />} />

        <Route
          path={urls.blogApp.blogPage}
          element={
            <BlogAppContextProvider>
              <BlogPage />
            </BlogAppContextProvider>
          }
        />
        <Route
          path={urls.blogApp.newArticle}
          element={
            <BlogAddArticleContextProvider>
              <BlogAddArticlePage />
            </BlogAddArticleContextProvider>
          }
        />
        <Route
          path={urls.blogApp.articleDetail}
          element={
            <BlogArticlePageContextProvider>
              <BlogArticlePage />
            </BlogArticlePageContextProvider>
          }
        />
        <Route
          path={urls.blogApp.updateArticle}
          element={
            <BlogUpdateArticlePageContextProvider>
              <BlogUpdateArticlePage />
            </BlogUpdateArticlePageContextProvider>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
