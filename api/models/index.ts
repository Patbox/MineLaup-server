import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import config from '../utils/config'

const sequelize = new Sequelize(
  config.get().database.name,
  config.get().database?.user,
  config.get().database?.password,
  {
    storage:
      config.get().database.type === 'sqlite' ? config.get().database.path : '',
    models: [path.join(__dirname, '/*.models.ts')],
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.model')) ===
        member.toLowerCase()
      )
    },
    dialect: config.get().database.type,
  }
)

export default sequelize
