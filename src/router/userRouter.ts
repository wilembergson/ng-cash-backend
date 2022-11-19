import { Router } from "express"

import { createUser } from "../controller/userController.js"
import { checkSchema } from "../middleware/checkSchema.js"
import { userSchema } from "../schemas/userSchema.js"

const userRouter = Router()

userRouter.post("/user", checkSchema(userSchema), createUser)

export default userRouter