import express from 'express'
import routes from './routes/index.js'

const app = express()

app.use(express.json())

app.use('/api', routes) // http://localhost:3000/api

app.get('/', (req, res) => {
  res.json({
    message: 'success'
  })
})

export default app