import { Router } from 'express'
import mongoose from 'mongoose'

const Todo = mongoose.model('Todo')

const router = Router()

const ok = { status: 'ok' }

router.get('/', (req, res) => res.send(ok))

router.get('/todos', async (req, res) => res.send(await Todo.find({})))

router.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const item = req.body
  await Todo.update({ _id: id }, item)
  res.send(ok)
})

router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  await Todo.remove({ _id: id })
  res.send(ok)
})

router.delete('/todos', async (req, res) => {
  await Todo.remove({})
  res.send(ok)
})

router.post('/todos', async (req, res) => {
  const item = req.body
  const data = await Todo.create([item])
  res.send({
    ...ok,
    data,
  })
})

export default router
