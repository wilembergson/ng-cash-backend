import { Router } from "express"

import accountRouter from "./accountRouter.js"
import authRouter from "./authRouter.js"
import transactionsRouter from "./transactionsRouter.js"
import userRouter from "./userRouter.js"

const router = Router()

router.use(userRouter)
router.use(authRouter)
router.use(accountRouter)
router.use(transactionsRouter)


export default router