import bodyParser from 'body-parser'
import console from 'console'
import cors from 'cors'
import express from 'express'
import fs from 'fs'

type Data = {
  id: string
  name: string
}
type Articles = {
  articles: Article[]
}
type Article = {
  id: number
  slug: string
  body: {
    title: string
    text: string
  }
}

const app = express()
const port = 1234
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const setUnifyString = (string: string) => {
  return string.toLocaleLowerCase().replace(/ /g, '').replace(/[y]/g, 'i')
}
const generateSlug = (textToSlug: string, id: number | string) => {
  return `${textToSlug.toLowerCase().replace(/\W+/g, '-')}-${id}`
}
const generateID = () => {
  return Math.floor(Math.random() * 100_000_000)
}
const getDataFromJSON = (fileName: string): Articles => {
  const dataString = fs.readFileSync(`${__dirname}/../${fileName}.json`, 'utf-8')
  return JSON.parse(dataString)
}
const putDataToJSON = (fileName: string, dataToJSON: {}) => {
  fs.writeFileSync(`${__dirname}/../${fileName}.json`, JSON.stringify(dataToJSON))
}
const isArticleReadable = (dataToRead: Article[]) => {
  return dataToRead.every((e: Article) => !e.id || !e.slug || !e.body.title || !e.body.text)
}

app.get('/http-filter', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8')
  const data = JSON.parse(dataString).users

  if (data.every((e: Data) => !e.name || !e.id)) {
    res.sendStatus(422)
  } else {
    res.send(
      data.filter((i: Data) =>
        setUnifyString(i.name).includes(setUnifyString(req.query.search!.toString()))
      )
    )
  }
})

app.get('/blog-filter', (req, res) => {
  const data = getDataFromJSON('articles').articles

  if (isArticleReadable(data)) {
    res.sendStatus(422)
  } else {
    res.send(
      data.filter(e =>
        setUnifyString(e.body.title).includes(setUnifyString(req.query.search?.toString() ?? ''))
      )
    )
  }
})

app.get('/articles', (req, res) => {
  const data = getDataFromJSON('articles').articles

  if (data.length < 1) {
    res.send(204)
  } else if (isArticleReadable(data)) {
    res.sendStatus(422)
  } else {
    res.send(data)
  }
})

app.get('/articles/:slug', (req, res) => {
  const data = getDataFromJSON('articles').articles
  const slug = req.params.slug
  const filteredArticle = data.filter(article => article.slug === slug)

  if (filteredArticle.length < 1) {
    res.sendStatus(404)
  } else {
    res.send(filteredArticle[0])
  }
})

app.post('/articles/', (req, res) => {
  const data = getDataFromJSON('articles')
  const id = generateID()
  data.articles.unshift({ id: id, slug: generateSlug(req.body.title, id), body: req.body })
  putDataToJSON('articles', data)
})

app.post('/update-article/:slug', (req, res) => {
  const data = getDataFromJSON('articles')
  const slug = req.params.slug
  const articles = data.articles.map(article =>
    article.slug === slug ? { ...article, body: req.body } : article
  )
  if (!data.articles.some(article => article.slug === slug)) {
    res.sendStatus(500)
  }

  putDataToJSON('articles', { articles })
  res.send('Article updated')
})

app.delete('/delete-article/:slug', (req, res) => {
  const data = getDataFromJSON('articles')
  const slug = req.params.slug
  const articles = data.articles.filter(article => article.slug !== slug)

  if (!data.articles.some(article => article.slug === slug)) {
    res.sendStatus(500)
  }
  putDataToJSON('articles', { articles })
  res.send('Article deleted')
})

app.listen(port)

export {}
