import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
} from 'sequelize-typescript'
import Users from './Users.model'
import Launcher from './Launcher.model'

@Table
export default class LauncherHasCollaborator extends Model<
  LauncherHasCollaborator
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Users)
  @Column
  userId!: string

  @ForeignKey(() => Launcher)
  @Column
  launcherId!: string
}
