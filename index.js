import express from 'express'
import bodyParser from 'body-parser'
import todos from './src/routes/todos'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//
app.use(todos)

const port = 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

app.use((err, req, res) => {
  const { message, stack } = err
  res.status(500).send({ status: 'error', message, stack })
})
