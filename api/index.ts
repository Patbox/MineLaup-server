import express, { Application } from 'express'
import bodyParser from 'body-parser'
import router from './routers'

const app: Application = express()

app.use(
  bodyParser.json({
    limit: '50mb',
  })
)

router(app)

export default {
  path: '/api',
  handler: app,
}
