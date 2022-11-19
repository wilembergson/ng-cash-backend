import { NextFunction, Request, Response } from "express"
import { ObjectSchema } from "joi"

import { validateSchema } from "../utils/validateSchema.js"

export function  checkSchema(schema:ObjectSchema){
    return (req:Request, res:Response, next:NextFunction) => {
        validateSchema(schema, req.body)
        next()
    }
}