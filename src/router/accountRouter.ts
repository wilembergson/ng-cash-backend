import { Router } from "express"

import { getBalance, toTranfer } from "../controller/accountController.js"
import { toAuthenticateRoute } from "../middleware/toAuthenticateRoute.js"
import { transferSchema } from "../schemas/transferSchema.js"

const accountRouter = Router()

accountRouter.get("/account/balance", toAuthenticateRoute(null), getBalance)
accountRouter.put("/account/transfer", toAuthenticateRoute(transferSchema), toTranfer)

export default accountRouter