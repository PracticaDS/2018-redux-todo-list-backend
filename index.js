import express from 'express'
import bodyParser from 'body-parser'
import uuid from 'uuid/v4'

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

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  items = items.filter(i => i.id !== id)
  res.send(ok)
})

app.post('/todos', (req, res) => {
  const item = req.body
  items = items.concat({
    id: uuid(),
    ...item,
  })
  res.send(ok)
})

const port = 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

app.use((err, req, res) => {
  const { message, stack } = err
  res.status(500).send({ status: 'error', message, stack })
})
