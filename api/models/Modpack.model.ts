import {
  Table,
  Model,
  IsUUID,
  Default,
  DataType,
  Column,
  Max,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript'
import Users from './Users.model'

@Table({
  timestamps: true,
})
export default class Modpack extends Model<Modpack> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id!: string

  @Max(75)
  @Column
  name!: string

  @Max(1024)
  @Column
  description!: string

  @ForeignKey(() => Users)
  @Column
  ownerId!: string

  @Default(false)
  @Column
  hasPicture!: boolean
}
