import { NextFunction, Request, Response } from "express"

import validateToken from "../utils/validateToken.js"

export function toAuthenticateRoute() {
    return (req: Request, res: Response, next: NextFunction) => {
      const payload = validateToken(req.headers.authorization)
      res.locals.payload = payload
      res.locals.body = req.body
      next()
    };
  }