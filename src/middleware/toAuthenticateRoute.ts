import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken";

import validateToken from "../utils/validateToken.js"

export function toAuthenticateRoute() {
    return (req: Request, res: Response, next: NextFunction) => {
      const payload = validateToken(req.headers.authorization)
      res.locals.payload = payload
      next()
    };
  }