import { Application } from 'express'
import AuthRouter from './auth.router'
import AdminRouter from './admin.router'
import ModpackRouter from './modpack.router'

export default (app: Application) => {
  app.use('/auth', AuthRouter)
  app.use('/admin', AdminRouter)
  app.use('/modpack', ModpackRouter)
}
