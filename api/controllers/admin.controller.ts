import { Request, Response } from 'express'
import Users from '../models/Users.model'

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

export default {
  users,
}
