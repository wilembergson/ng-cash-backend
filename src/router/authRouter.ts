import { Router } from "express"

import { login } from "../controller/authController.js"
import { checkSchema } from "../middleware/checkSchema.js"
import { loginSchema } from "../schemas/loginSchema.js"

const authRouter = Router()

authRouter.get("/login", checkSchema(loginSchema), login)

export default authRouter