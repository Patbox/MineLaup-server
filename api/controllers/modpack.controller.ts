import { Request, Response } from 'express'
import Joi from '@hapi/joi'
import Modpack from '../models/Modpack.model'
import ModpackVersion from '../models/ModpackVersion.model'

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
  try {
    const modpacks = await Modpack.findAll({
      where: {
        ownerId: req.body.user.id,
      },
      raw: true,
    })

    return res.status(200).send({
      modpacks,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).send(error)
  }
}

async function get(req: Request, res: Response) {
  const { error } = Joi.object({
    id: Joi.string().required(),
  }).validate(req.query)

  if (error) {
    return res.status(400).send({
      message: 'Missing id parameters in the request',
      error: 'error.validation.missing_request_params',
    })
  }

  try {
    const modpack = await Modpack.findOne({
      where: {
        id: req.query.id,
        ownerId: req.body.user.id,
      },
      raw: true,
    })

    if (modpack) {
      const versions = await ModpackVersion.findAll({
        where: {
          modpackId: modpack.id,
        },
        raw: true,
      })

      return res.status(200).send({
        modpack: {
          ...modpack,
          versions,
        },
      })
    }

    return res.sendStatus(404)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).send(error)
  }
}

async function newVersion(req: Request, res: Response) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    version: Joi.string().pattern(/^(\d+\.)?(\d+\.)?(\*|\d+)$/, {
      name: 'Semver',
    }),
    modpackId: Joi.string().required(),
    user: Joi.any(),
  }).validate(req.body)

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
    await ModpackVersion.create(
      {
        name: req.body.name,
        modpackId: req.body.modpackId,
        version: req.body.version,
      },
      {
        raw: true,
      }
    )

    return res.sendStatus(200)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).send(error)
  }
}

async function versions(req: Request, res: Response) {
  const { error } = Joi.object({
    id: Joi.string().required(),
  }).validate(req.query)

  if (error) {
    return res.status(400).send({
      message: 'Missing id parameters in the request',
      error: 'error.validation.missing_request_params',
    })
  }

  try {
    const modpack = await Modpack.findOne({
      where: {
        id: req.query.id,
        ownerId: req.body.user.id,
      },
    })

    if (modpack) {
      const versions = await ModpackVersion.findAll({
        where: {
          modpackId: modpack.id,
        },
        order: [['createdAt', 'DESC']],
      })

      if (versions) {
        return res.status(200).send({
          versions,
        })
      }
    }

    return res.sendStatus(404)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).send(error)
  }
}

async function deleteVersion(req: Request, res: Response) {
  const schema = Joi.object({
    id: Joi.number().required(),
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
    const modpack = await Modpack.findOne({
      where: {
        id: req.query.id,
        ownerId: req.body.user.id,
      },
    })

    if (modpack) {
      await ModpackVersion.destroy({
        where: {
          modpackId: modpack.id,
          id: req.body.id,
        },
      })

      return res.status(200).send({
        message: 'Modpack version deleted',
      })
    }

    return res.sendStatus(404)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default {
  create,
  list,
  get,
  newVersion,
  versions,
  deleteVersion,
}
