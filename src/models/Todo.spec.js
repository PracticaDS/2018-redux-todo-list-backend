import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'
import './Todo'

const { ObjectId } = mongoose.Types

const mockgoose = new Mockgoose(mongoose)

const Todo = mongoose.model('Todo')

describe('Model - Todo', () => {

  beforeAll(async () => {
    await mockgoose.prepareStorage()
    await mongoose.connect('mongodb://example.com/TestingDB')
  })
  afterEach(async () => {
    mockgoose.helper.reset()
  })

  describe('save()', () => {

    it('debe requerir text', async () => {
      try {
        await new Todo({}).save()
        throw new Error('Tenia que haber fallado')
      } catch (err) {
        expect(err.message)
          .toEqual('Todo validation failed: text: Path `text` is required.')
      }
    })

    it('debe setear done en false por defecto', async () => {
      const saved = await new Todo({ text: 'do something' }).save()
      expect(saved).toMatchObject({
        _id: expect.any(ObjectId),
        done: false
      })
      expect(await Todo.count()).toEqual(1)
    })

  })

})
