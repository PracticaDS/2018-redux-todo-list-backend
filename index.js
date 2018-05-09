
import app from './src/server'

const port = 3001
app.listen(port, () => {
  console.log(`TODO list backend listening on port ${port}!`)
})
