import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
  text: { type: String, required: true },
  done: Boolean,
})

mongoose.model('Todo', schema)
