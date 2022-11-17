import { Router } from "express"

import { login } from "../controller/authController.js"
import { schemaValidate } from "../middleware/schemaValidate.js"
import { loginSchema } from "../schemas/loginSchema.js"

const authRouter = Router()

authRouter.get("/login", schemaValidate(loginSchema), login)

export default authRouter