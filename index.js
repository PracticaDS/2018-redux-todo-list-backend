import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'

import './src/models/Todo'
import todos from './src/routes/todos'

mongoose.connect('mongodb://localhost/pdes-todos')

const app = express()
app.use(morgan('combined'))
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
