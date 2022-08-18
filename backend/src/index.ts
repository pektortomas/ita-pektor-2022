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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
})

app.get('/http-filter', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8')
  const data = JSON.parse(dataString).users

  res.send(
    data.filter((i: Data) =>
      i.name.toLowerCase().includes(req.query.search!.toString().toLowerCase())
    )
  )
})

app.listen(port)

export {}
