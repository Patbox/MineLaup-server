import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
} from 'sequelize-typescript'
import User from './User.model'
import Modpack from './Modpack.model'

@Table
export default class ModpackHasCollaborator extends Model<
  ModpackHasCollaborator
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => User)
  @Column
  userId!: string

  @ForeignKey(() => Modpack)
  @Column
  modpackId!: string
}
