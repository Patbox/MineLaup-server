import { Request, Response } from 'express'
import Joi, { ValidationResult } from '@hapi/joi'
import Users from '../models/Users.model'
import { UserRole } from '../../types/UserRole'

async function users(_req: Request, res: Response) {
  try {
    const users = await Users.findAll({
      attributes: [
        'id',
        'username',
        'email',
        'role',
        'language',
        'createdAt',
        'colorMode',
      ],
    })

    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send(error)
  }
}

async function createUser(req: Request, res: Response) {
  const schema = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
    email: Joi.string().email().allow(''),
    role: Joi.string().valid('admin', 'moderator', 'user'),
  })

  const { error }: ValidationResult = schema.validate(req.body, {
    abortEarly: false,
  })

  if (error) {
    const formatedErrors: any = {}

    for (const e of error.details) {
      formatedErrors[e.path[0]] = {
        message: e.message,
        errorKey: `error.validation.${e.type.replace(/\./g, '_')}`,
      }
    }

    return res.status(400).send({
      errors: formatedErrors,
    })
  }

  try {
    const user = new Users({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email.length > 0 ? req.body.email : null,
      role: UserRole[req.body.role],
    })

    await user.save()

    return res.status(200).send({
      message: 'User created',
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default {
  users,
  createUser,
}
