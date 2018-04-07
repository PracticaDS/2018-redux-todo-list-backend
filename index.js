import express from 'express'

const app = express()

const items = [
  { id: 0, text: 'Comprar verduras', done: false },
  { id: 1, text: 'Sacar turno con el doctor', done: false },
  { id: 2, text: 'Actualizar partida de nacimiento', done: false },
]

app.get('/todos', (req, res) => res.send(items))

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
