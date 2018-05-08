
import app from './src/server'

const port = 3001
app.listen(port, () => {
  console.log(`TODO list backend listening on port ${port}!`)
})

app.use((err, req, res) => {
  const { message, stack } = err
  res.status(500).send({ status: 'error', message, stack })
})
