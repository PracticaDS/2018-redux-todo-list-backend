import express from 'express'
import bodyParser from 'body-parser'
import * as WebSocket from 'ws'
import todos from './src/routes/todos'

// express

const app = express()

const server = require('http').createServer(app)

const wss = new WebSocket.Server({ server })
const broadcastEvent = e => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(e))
    }
  })
}

//
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(todos(broadcastEvent))

app.use((err, req, res) => {
  const { message, stack } = err
  res.status(500).send({ status: 'error', message, stack })
})

// websockets

wss.on('connection', client => {
  console.log('connection stablished')
  client.on('event', data => { console.log('GOT', data) });
  client.on('disconnect', () => { console.log('disconnected') });
})


const port = 3001
server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
