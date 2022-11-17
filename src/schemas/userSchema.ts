import Joi from "joi"

import { UserInsertBody } from "../repository/userRepository"

export const userSchema = Joi.object<UserInsertBody>({
    username: Joi.string().min(3).required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
})