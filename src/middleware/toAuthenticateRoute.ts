import { NextFunction, Request, Response } from "express"
import { ObjectSchema } from "joi"

import { validateSchema } from "../utils/validateSchema.js"

import validateToken from "../utils/validateToken.js"

export function toAuthenticateRoute(schema:ObjectSchema | null) {
    return (req: Request, res: Response, next: NextFunction) => {
      const payload = validateToken(req.headers.authorization)
      validateSchema(schema, req.body)
      res.locals.payload = payload
      res.locals.body = req.body
      next()
    };
  }