import { Router } from "express"

import accountRouter from "./accountRouter.js"
import authRouter from "./authRouter.js"
import userRouter from "./userRouter.js"

const router = Router()

router.use(userRouter)
router.use(authRouter)
router.use(accountRouter)


export default router