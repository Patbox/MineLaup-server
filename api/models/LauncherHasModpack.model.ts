import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  IsUUID,
  Column,
} from 'sequelize-typescript'
import Launcher from './Launcher.model'
import Modpack from './Modpack.model'

@Table
export default class LauncherHasModpack extends Model<LauncherHasModpack> {
  @IsUUID(4)
  @PrimaryKey
  @ForeignKey(() => Launcher)
  @Column
  id!: string

  @ForeignKey(() => Modpack)
  @Column
  modpackId!: string
}
