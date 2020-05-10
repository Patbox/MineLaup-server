import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
} from 'sequelize-typescript'
import ModpackVersion from './ModpackVersion.model'

@Table
export default class ModpackVersionHasModVersion extends Model<
  ModpackVersionHasModVersion
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => ModpackVersion)
  @Column
  modpackVersionId!: number
}
