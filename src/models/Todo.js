import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
})

mongoose.model('Todo', schema)
