import cors from 'cors'
import express from 'express'
import fs from 'fs'

type Data = {
  id: string
  name: string
}

const app = express()
const port = 1234
app.use(cors())

const setUnifyString = (string: string) => {
  return string.toLocaleLowerCase().replace(/ /g, '').replace(/[y]/g, 'i')
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
})

try {
  app.get('/http-filter', (req, res) => {
    const dataString = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8')
    const data = JSON.parse(dataString).users

    if (data.every((e: Data) => !e.name || !e.id)) throw new SyntaxError('Invalid data')

    res.send(
      data.filter((i: Data) =>
        setUnifyString(i.name).includes(setUnifyString(req.query.search!.toString()))
      )
    )
  })
} catch (err) {
  console.log(err)
}

app.listen(port)

export {}
