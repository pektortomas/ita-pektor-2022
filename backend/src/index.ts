import bodyParser from 'body-parser'
import console from 'console'
import cors from 'cors'
import express from 'express'
import fs from 'fs'

type Data = {
  id: string
  name: string
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
  const dataString = fs.readFileSync(`${__dirname}/../articles.json`, 'utf-8')
  const data = JSON.parse(dataString).articles

  if (data.every((e: Article) => !e.id || !e.slug || !e.body.title || !e.body.text)) {
    res.sendStatus(422)
  } else {
    res.send(
      data.filter((e: Article) =>
        setUnifyString(e.body.title).includes(setUnifyString(req.query.search?.toString() ?? ''))
      )
    )
  }
})

app.get('/articles', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../articles.json`, 'utf-8')
  const data = JSON.parse(dataString).articles

  if (data.length < 1) {
    res.send(204)
  } else if (data.every((e: Article) => !e.id || !e.slug || !e.body.title || !e.body.text)) {
    res.sendStatus(422)
  } else {
    res.send(data)
  }
})

app.get('/articles/:slug', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../articles.json`, 'utf-8')
  const dataJson = JSON.parse(dataString)
  const slug = req.params.slug
  const filteredArticle = dataJson.articles.filter((article: Article) => article.slug === slug)

  if (filteredArticle.length < 1) {
    res.sendStatus(404)
  } else {
    res.send(filteredArticle[0])
  }
})

app.post('/articles/', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../articles.json`, 'utf-8')
  const dataJson = JSON.parse(dataString)
  const id = generateID()
  dataJson.articles.unshift({ id: id, slug: generateSlug(req.body.title, id), body: req.body })
  fs.writeFileSync(`${__dirname}/../articles.json`, JSON.stringify(dataJson))
})

app.post('/update-article/:slug', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../articles.json`, 'utf-8')
  const slug = req.params.slug
  const dataJson = JSON.parse(dataString)
  const articles = dataJson.articles.map((article: Article) =>
    article.slug === slug ? { ...article, body: req.body } : article
  )

  fs.writeFileSync(`${__dirname}/../articles.json`, JSON.stringify({ articles }))
})

app.delete('/delete-article/:slug', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../articles.json`, 'utf-8')
  const slug = req.params.slug
  const dataJson = JSON.parse(dataString)
  const articles = dataJson.articles.filter((article: Article) => article.slug !== slug)

  fs.writeFileSync(`${__dirname}/../articles.json`, JSON.stringify({ articles }))
})

app.listen(port)

export {}
