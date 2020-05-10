import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
} from 'sequelize-typescript'
import Modpack from './Modpack.model'

@Table
export default class ModpackVersion extends Model<ModpackVersion> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Modpack)
  @Column
  modpackId!: string

  @Column
  version!: string
}
