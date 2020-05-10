import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  Max,
} from 'sequelize-typescript'

@Table
export default class Permission extends Model<Permission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Max(45)
  @Column
  name!: string

  @Max(1024)
  @Column
  description!: string
}
