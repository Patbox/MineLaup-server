import {
  Table,
  Model,
  PrimaryKey,
  Column,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript'
import Mod from './Mod.model'

@Table
export default class ModVersion extends Model<ModVersion> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Mod)
  @Column
  modId!: number

  @Column
  fileId!: number
}
