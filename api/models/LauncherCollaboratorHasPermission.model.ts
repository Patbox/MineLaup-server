import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
} from 'sequelize-typescript'
import Permission from './Permision.models'
import LauncherHasCollaborator from './LauncherHasCollaborator.model'

@Table
export default class LauncherCollaboratorHasPermission extends Model<
  LauncherCollaboratorHasPermission
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => LauncherHasCollaborator)
  @Column
  collaboratorId!: number

  @ForeignKey(() => Permission)
  @Column
  permissionId!: number
}
