
import start from './src/server'

const port = 3001

start().listen(port, () => {
  console.log(`TODO list backend listening on port ${port}!`)
})
