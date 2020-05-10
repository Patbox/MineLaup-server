import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
} from 'sequelize-typescript'
import User from './User.model'
import Launcher from './Launcher.model'

@Table
export default class LauncherHasCollaborator extends Model<
  LauncherHasCollaborator
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => User)
  @Column
  userId!: string

  @ForeignKey(() => Launcher)
  @Column
  launcherId!: string
}
