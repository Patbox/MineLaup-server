import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../utils/config'
import Users from '../models/Users.model'
import { UserRole } from '../../types/UserRole'

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(400).send({
      message: 'Authorization header not found.',
      errorKey: 'auth.login.token_not_found',
    })
  }

  jwt.verify(token, config.get().jwt_token, async function (
    error:
      | jwt.JsonWebTokenError
      | jwt.NotBeforeError
      | jwt.TokenExpiredError
      | null,
    result: object | undefined
  ) {
    if (error || result === undefined) {
      return res.status(403).json({
        message: 'Provided token is invalid.',
        errorKey: 'auth.login.invalid_token',
        error,
      })
    }
    const user = await Users.findOne({
      // @ts-ignore
      where: { id: result.id },
    })

    if (user && user.role >= UserRole.admin) {
      return next()
    }

    return res.status(403).json({
      message: 'Provided token is invalid.',
      errorKey: 'auth.login.invalid_token',
    })
  })
}
