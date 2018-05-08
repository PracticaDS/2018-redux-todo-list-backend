import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'
import request from 'supertest'

import app from '../server'

const mockgoose = new Mockgoose(mongoose)
const Todo = mongoose.model('Todo')

describe('Routes - Todo', () => {

  beforeAll(async () => {
    await mockgoose.prepareStorage()
    await mongoose.connect('mongodb://example.com/TestingDB')
  })
  afterEach(async () => {
    mockgoose.helper.reset()
  })

  describe('POST /todos', () => {

    it('debe guardar el TODO en mongo', async () => {
      await request(app)
        .post('/todos')
        .send({ text: 'Ir a dentiste' })
        .expect(200)
        .expect(res =>
          expect(res.body).toEqual({
            status: 'ok',
            data: [{
              __v: 0,
              _id: expect.any(String),
              text: 'Ir a dentiste',
              done: false,
            }]
          })
        )
      //
      expect(await Todo.count()).toEqual(1)
    })

  })

})
