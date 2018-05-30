import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import mongoose from 'mongoose'
import './models/Todo'

import todos from './routes/todos'

const start = () => {
  mongoose.connect('mongodb://localhost/pdes-todos')

  const app = express()
  app.use(morgan('combined'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  //
  app.use(todos)

  app.use((err, req, res) => {
    const { message, stack } = err
    res.status(500).send({ status: 'error', message, stack })
  })
  return app
}

export default start
