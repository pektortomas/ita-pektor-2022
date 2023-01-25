import bodyParser from 'body-parser'
import console from 'console'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import util from 'util'

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

const checkFile = util.promisify(fs.stat)
const createFile = util.promisify(fs.writeFile)

const initDb = async () => {
  const initData = { articles: [] }
  try {
    await checkFile(`${__dirname}/../articles.json`)
  } catch (error) {
    await createFile(`${__dirname}/../articles.json`, JSON.stringify(initData))
  }
}

initDb()

const app = express()
const port = 1234
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const options = {
  definition: {
    explorer: true,
    openapi: '3.0.0',
    info: {
      title: 'Blog REST Api',
      version: '1.0.0',
      description: 'Blog api',
      contact: {
        name: 'Tomáš Pektor',
        url: 'http://tomaspektor.cz/',
        email: 'pektor.tomas@gmail.com',
      },
    },
    components: {
      schemas: {
        article: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'Generated number',
            },
            slug: {
              type: 'string',
              description: 'Generated url slug from tittle-id',
            },
            body: {
              type: 'object',
              description: 'Object contains title and text',
            },
            title: {
              type: 'string',
              description: 'Main article title',
            },
            text: {
              type: 'string',
              description: 'Article text',
            },
          },
          example: {
            id: 751354,
            slug: 'article-751354',
            body: {
              title: 'article',
              text: 'article text',
            },
          },
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:1234',
      },
    ],
  },

  apis: ['src/index.ts'],
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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

/**
 * @swagger
 * /blog-filter:
 *   get:
 *     summary: Return the filtered articles data
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: search term
 *         schema:
 *           type: string
 *         required: true
 *         description: Filter term
 *     responses:
 *       200:
 *         description: Returns JSON list of articles based on filter term
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Return all articles
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Returns JSON list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *       204:
 *         description: Empty database
 *       422:
 *         description: Invalid data
 *       500:
 *         description: Server error
 */

app.get('/articles', (req, res) => {
  const data = getDataFromJSON('articles').articles

  if (data.length < 1) {
    res.sendStatus(204)
  } else if (isArticleReadable(data)) {
    res.sendStatus(422)
  } else {
    res.send(data)
  }
})

/**
 * @swagger
 * /articles/:slug:
 *   get:
 *     summary: Return article by its slug
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique slug
 *     responses:
 *       200:
 *         description: Returns JSON Article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /articles/:
 *   post:
 *     summary: Post new article to database
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              title:
 *                type: string
 *              text:
 *                type: string
 *     responses:
 *       200:
 *         description: Returns "Ok"
 *       500:
 *         description: Server error
 */
app.post('/articles/', (req, res) => {
  const data = getDataFromJSON('articles')
  const id = generateID()
  data.articles.unshift({ id: id, slug: generateSlug(req.body.title, id), body: req.body })
  putDataToJSON('articles', data)
  res.send('ok')
})

/**
 * @swagger
 * /update-article/:slug:
 *   post:
 *     summary: Update article in database
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique slug
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              title:
 *                type: string
 *              text:
 *                type: string
 *     responses:
 *       200:
 *         description: Returns "Article updated"
 *       400:
 *         description: Error in database
 *       500:
 *         description: Server error
 */
app.post('/update-article/:slug', (req, res) => {
  const data = getDataFromJSON('articles')
  const slug = req.params.slug
  const articles = data.articles.map(article =>
    article.slug === slug ? { ...article, body: req.body } : article
  )
  if (!data.articles.some(article => article.slug === slug)) {
    res.sendStatus(400)
  } else {
    putDataToJSON('articles', { articles })
    res.send('Article updated')
  }
})

/**
 * @swagger
 * /delete-article/:slug:
 *   delete:
 *     summary: Delete article in database
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique slug
 *     responses:
 *       200:
 *         description: Returns "Article deleted"
 *       400:
 *         description: Error in database
 *       500:
 *         description: Server error
 */
app.delete('/delete-article/:slug', (req, res) => {
  const data = getDataFromJSON('articles')
  const slug = req.params.slug
  const articles = data.articles.filter(article => article.slug !== slug)

  if (!data.articles.some(article => article.slug === slug)) {
    res.sendStatus(400)
  } else {
    putDataToJSON('articles', { articles })
    res.send('Article deleted')
  }
})

app.listen(port)

export {}
