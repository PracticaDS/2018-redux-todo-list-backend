import express from 'express'
import bodyParser from 'body-parser'
import uuid from 'uuid/v4'
import { update } from 'ramda'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//

const initialState = [
  { id: uuid(), text: 'Comprar verduras', done: false },
  { id: uuid(), text: 'Sacar turno con el doctor', done: false },
  { id: uuid(), text: 'Actualizar partida de nacimiento', done: false },
]

let items = initialState

const ok = { status: 'ok' }

app.get('/todos', (req, res) => res.send(items))
app.post('/reset', (req, res) => {
  items = initialState
  res.send(ok)
})

app.put('/todos/:id', (req, res) => {
  const { id } = req.params
  const item = req.body
  items = update(items.findIndex(_ => _.id === id), item, items)
  res.send(ok)
})

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params
  items = items.filter(i => i.id !== id)
  res.send(ok)
})

app.post('/todos', (req, res) => {
  const item = req.body
  const updatedItem = {
    id: uuid(),
    ...item,
  }
  items = items.concat(updatedItem)
  res.send({
    ...ok,
    data: updatedItem,
  })
})

const port = 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

app.use((err, req, res) => {
  const { message, stack } = err
  res.status(500).send({ status: 'error', message, stack })
})
