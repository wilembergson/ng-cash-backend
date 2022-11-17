import Joi from "joi"

import { UserInsertBody } from "../repository/userRepository"

export const loginSchema = Joi.object<UserInsertBody>({
    username: Joi.string().required(),
    password: Joi.string().required()
})