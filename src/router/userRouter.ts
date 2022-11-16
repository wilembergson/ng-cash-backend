import { Router } from "express"

import { createUser } from "../controller/userController.js"
import { schemaValidate } from "../middleware/schemaValidate.js"
import { userSchema } from "../schemas/userSchema.js"

const userRouter = Router()

userRouter.post("/user", schemaValidate(userSchema), createUser)

export default userRouter