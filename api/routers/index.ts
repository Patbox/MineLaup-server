import { Application } from 'express'
import AuthRouter from './auth.router'

export default (app: Application) => {
  app.use('/auth', AuthRouter)
}
