import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
} from 'sequelize-typescript'
import ModpackHasCollaborator from './ModpackHasCollaborator.model'
import Permission from './Permision.models'

@Table
export default class ModpackCollaboratorHasPermission extends Model<
  ModpackCollaboratorHasPermission
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => ModpackHasCollaborator)
  @Column
  collaboratorId!: number

  @ForeignKey(() => Permission)
  @Column
  permissionId!: number
}
