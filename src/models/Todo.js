import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
  text: String,
  done: Boolean,
})

mongoose.model('Todo', schema)
