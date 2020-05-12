import { Request, Response } from 'express'
import Joi, { ValidationResult } from '@hapi/joi'
import jwt from 'jsonwebtoken'
import Users from '../models/Users.model'
import config from '../utils/config'

async function login(req: Request, res: Response) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
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
    const user = await Users.findOne({ where: { username: req.body.username } })

    if (user && (await user.validPassword(req.body.password))) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          language: user.language,
          colorMode: user.colorMode,
        },
        config.get().jwt_token,
        {
          expiresIn: '1d',
        }
      )

      return res.status(200).send({
        message: 'User logged in',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          language: user.language,
        },
        token,
      })
    }

    return res.status(403).send({
      message: 'Username or password invalid',
      errorKey: 'auth.login.invalid',
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

async function user(req: Request, res: Response) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(400).send({
      message: 'Authorization header not found.',
      errorKey: 'auth.login.token_not_found',
    })
  }

  await jwt.verify(token, config.get().jwt_token, async function (
    error:
      | jwt.JsonWebTokenError
      | jwt.NotBeforeError
      | jwt.TokenExpiredError
      | null,
    result: object | undefined
  ) {
    if (error) {
      return res.status(403).json({
        message: 'Provided token is invalid.',
        errorKey: 'auth.login.invalid_token',
        error,
      })
    }

    // @ts-ignore
    const user = await Users.findOne({ where: { id: result.id } })

    if (user) {
      return res.status(200).json({
        message: 'Provided token is valid.',
        user,
      })
    }

    return res.status(403).json({
      message: 'Provided token is invalid.',
      errorKey: 'auth.login.invalid_token',
    })
  })
}

export default {
  login,
  user,
}
