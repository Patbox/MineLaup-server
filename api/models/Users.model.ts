import bcrypt from 'bcrypt'
import {
  Table,
  Model,
  IsUUID,
  PrimaryKey,
  Column,
  Max,
  Unique,
  IsEmail,
  AllowNull,
  DataType,
  Default,
  BeforeUpdate,
  BeforeCreate,
} from 'sequelize-typescript'
import { UserRole, IUserRole } from '../../types/UserRole'
import { ColorMode, IColorMode } from '../../types/ColorMode'

@Table({
  timestamps: true,
})
export default class Users extends Model<Users> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id!: string

  @Max(100)
  @Unique
  @Column
  username!: string

  @Column
  password!: string

  @IsEmail
  @AllowNull
  @Column
  email!: string

  @Default(UserRole.user)
  @Column(DataType.TINYINT)
  role!: IUserRole

  @Default('en')
  @Column
  language!: string

  @Default('LIGHT')
  @Column(DataType.ENUM(...Object.values(ColorMode)))
  colorMode!: IColorMode

  @BeforeUpdate
  @BeforeCreate
  static async cryptPassword(instance: Users) {
    await cryptPassword(instance.password).then((success) => {
      instance.password = success
    })
  }

  validPassword(password: string) {
    return bcrypt.compare(password, this.password)
  }
}

function cryptPassword(password: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(10, (err, salt) => {
      // Encrypt password using bcrypt module
      if (err) return reject(err)

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err)
        return resolve(hash)
      })
    })
  })
}
