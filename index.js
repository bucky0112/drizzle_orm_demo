import app from './src/app.js'
import config from './src/config/index.js'

const port = config.port

app.listen(port, () => {
  console.log(`伺服器運作在 http://localhost:${port}`)
})