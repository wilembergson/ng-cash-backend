import { NextFunction, Request, Response } from "express"
import { ObjectSchema } from "joi"

export function  schemaValidate(schema:ObjectSchema){
    return (req:Request, res:Response, next:NextFunction) => {
        const validation = schema.validate(req.body)
        if(validation.error) return res.status(422).send({error: "O username deve ter no mínimo 3 caracteres. A senha deve ter no mínimo 8 caracteres, pelo menos um número e uma letra maiúscula."})
        next()
    }
}