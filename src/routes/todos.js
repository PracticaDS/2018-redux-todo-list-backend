import uuid from 'uuid/v4'
import { update } from 'ramda'
import { Router } from 'express'

export default broadCastEvent => {
  const router = Router()

  const initialState = [
    { id: uuid(), text: 'Comprar verduras', done: false },
    { id: uuid(), text: 'Sacar turno con el doctor', done: false },
    { id: uuid(), text: 'Actualizar partida de nacimiento', done: false },
  ]

  let items = initialState

  const ok = { status: 'ok' }

  router.get('/todos', (req, res) => res.send(items))
  router.post('/reset', (req, res) => {
    items = initialState
    res.send(ok)
  })

  router.put('/todos/:id', (req, res) => {
    const { id } = req.params
    const item = req.body
    items = update(items.findIndex(_ => _.id === id), item, items)

    broadCastEvent({
      type: 'UPDATED',
      id,
      item,
      from: req.get('UserId'),
    })

    res.send(ok)
  })

  router.delete('/todos/:id', (req, res) => {
    const { id } = req.params
    items = items.filter(i => i.id !== id)

    broadCastEvent({
      type: 'DELETED',
      id,
      from: req.get('UserId'),
    })

    res.send(ok)
  })

  router.post('/todos', (req, res) => {
    const item = req.body
    const updatedItem = {
      id: uuid(),
      ...item,
    }
    items = items.concat(updatedItem)

    broadCastEvent({
      type: 'ADDED',
      item: updatedItem,
      from: req.get('UserId'),
    })

    res.send({
      ...ok,
      data: updatedItem,
    })
  })

  return router

}
