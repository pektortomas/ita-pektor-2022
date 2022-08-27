import bodyParser from 'body-parser'
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

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  next()
})

//Filter
app.get('/http-filter', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8')
  const data = JSON.parse(dataString).users

  if (data.every((e: Data) => !e.name || !e.id)) {
    res.sendStatus(422)
    console.info('Invalid data in data.users')
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
    console.info('Invalid data in data.articles')
  } else {
    console.info(
      data.filter((e: Article) =>
        setUnifyString(e.body.title).includes(setUnifyString(req.query.search!.toString()))
      )
    )
    res.send(
      data.filter((e: Article) =>
        setUnifyString(e.body.title).includes(setUnifyString(req.query.search!.toString()))
      )
    )
  }
})

app.get('/articles', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../articles.json`, 'utf-8')
  const data = JSON.parse(dataString).articles

  if (data.every((e: Article) => !e.id || !e.slug || !e.body.title || !e.body.text)) {
    res.sendStatus(422)
    console.info('Invalid data in data.articles')
  }

  res.send(data)
})

app.get('/articles/:slug', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../articles.json`, 'utf-8')
  const dataJson = JSON.parse(dataString)
  const slug = req.params.slug
  const filteredArticle = dataJson.articles.filter((article: Article) => article.slug === slug)

  if (filteredArticle.length < 1) {
    res.sendStatus(404)
    console.info('No article in database')
  }
  console.info('někdo vytáhl slug ' + slug)
  res.send(filteredArticle[0])
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
  const articles = dataJson.articles.map((article: Article) => {
    if (article.slug === slug) article = { id: article.id, slug: article.slug, body: req.body }
    return article
  })
  fs.writeFileSync(`${__dirname}/../articles.json`, JSON.stringify({ articles }))
})

app.delete('/delete-article/:slug', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../articles.json`, 'utf-8')
  const slug = req.params.slug
  const dataJson = JSON.parse(dataString)
  const articles = dataJson.articles.filter((article: Article) => article.slug !== slug)

  console.info('někdo chce smazat' + slug)
  fs.writeFileSync(`${__dirname}/../articles.json`, JSON.stringify({ articles }))
})

app.listen(port)

export {}
