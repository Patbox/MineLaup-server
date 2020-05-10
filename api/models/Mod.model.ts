import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  Max,
} from 'sequelize-typescript'

@Table
export default class Mod extends Model<Mod> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Max(128)
  @Column
  slugName!: string
}
