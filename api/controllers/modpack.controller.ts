import { Request, Response } from 'express'
import Joi from '@hapi/joi'
import Modpack from '../models/Modpack.model'

async function create(req: Request, res: Response) {
  const schema = Joi.object({
    name: Joi.string().required().max(75),
    description: Joi.string().required().max(1024),
    user: Joi.any(),
  })

  const { error } = schema.validate(req.body, {
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
    const modpack = await Modpack.create(
      {
        name: req.body.name,
        description: req.body.description,
        ownerId: req.body.user.id,
      },
      {
        raw: true,
      }
    )
    const modpackList = await Modpack.findAll({
      where: {
        ownerId: req.body.user.id,
      },
      raw: true,
    })

    return res.status(200).send({
      modpack,
      modpackList,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).send(error)
  }
}

async function list(req: Request, res: Response) {
  const modpacks = await Modpack.findAll({
    where: {
      ownerId: req.body.user.id,
    },
    raw: true,
  })

  return res.status(200).send({
    modpacks,
  })
}

export default {
  create,
  list,
}
