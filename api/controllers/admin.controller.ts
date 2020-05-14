import { Request, Response } from 'express'
import Joi, { ValidationResult } from '@hapi/joi'
import { Op } from 'sequelize'
import Users from '../models/Users.model'
import { UserRole } from '../../types/UserRole'

async function users(req: Request, res: Response) {
  const schema = Joi.object({
    items: Joi.string().alphanum().allow('').optional(),
    type: Joi.string().allow('').optional(),
    filter: Joi.string().alphanum().allow('').optional(),
    page: Joi.string().alphanum().allow('').optional(),
  })

  const { error, value: searchArgs }: ValidationResult = schema.validate(
    req.query
  )

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

  let role: any

  switch (parseInt(searchArgs.type)) {
    case 2:
      role = { [Op.gte]: 2 }
      break
    case 1:
    case 0:
      role = { [Op.eq]: searchArgs.type }
      break
    default:
      role = { [Op.in]: [0, 1, 2, 3] }
  }

  const username =
    searchArgs.filter.length > 0
      ? { [Op.substring]: searchArgs.filter }
      : { [Op.not]: '' }
  const items =
    !isNaN(searchArgs.items) && parseInt(searchArgs.items)
      ? parseInt(searchArgs.items)
      : 0
  const page =
    !isNaN(searchArgs.page) && parseInt(searchArgs.page)
      ? parseInt(searchArgs.page)
      : 0

  try {
    const { count, rows } = await Users.findAndCountAll({
      attributes: [
        'id',
        'username',
        'email',
        'role',
        'language',
        'createdAt',
        'colorMode',
      ],
      limit: items,
      offset: items * page,
      where: {
        role,
        username,
      },
      raw: true,
    })

    return res.status(200).send({
      users: rows,
      current: page + 1,
      total: Math.ceil(count / items),
    })
  } catch (error) {
    return res.status(500).send({ error })
  }
}

async function fetchUser(req: Request, res: Response) {
  if (req.query.id) {
    const user = await Users.findOne({
      attributes: [
        'id',
        'username',
        'email',
        'role',
        'language',
        'createdAt',
        'colorMode',
      ],
      where: { id: req.query.id },
    })

    return res.status(200).send({
      user,
    })
  } else {
    return res.status(400).send({
      message: 'User ID not provided',
    })
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

async function deleteUser(req: Request, res: Response) {
  const schema = Joi.object({
    id: Joi.string().required(),
  })
  const { error } = schema.validate(req.query)

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
    await Users.destroy({
      where: {
        id: req.query.id,
      },
    })

    return res.status(200).send({
      message: 'User deleted',
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

async function updateUser(req: Request, res: Response) {
  const schema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email().allow(''),
    role: Joi.string().valid('admin', 'moderator', 'user'),
    colorMode: Joi.string().valid('DARK', 'LIGHT'),
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
    await Users.update(
      {
        username: req.body.username,
        email: req.body.email.length > 0 ? req.body.email : null,
        role: UserRole[req.body.role],
        colorMode: req.body.colorMode,
      },
      {
        where: {
          id: req.query.id,
        },
      }
    )

    return res.status(200).send({
      message: 'User update',
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default {
  users,
  createUser,
  deleteUser,
  fetchUser,
  updateUser,
}
