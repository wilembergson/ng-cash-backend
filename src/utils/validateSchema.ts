import { ObjectSchema } from "joi"

import ErrorMessage from "./errorMessage.js"

export function validateSchema(schema:ObjectSchema, reqBody:Object){
    if(schema === null) return
    const validation = schema.validate(reqBody)
        if(validation.error) ErrorMessage(422, validation.error.message)
}