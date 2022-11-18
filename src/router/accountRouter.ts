import { Router } from "express"

import { getBalance, toTranfer } from "../controller/accountController.js"
import { toAuthenticateRoute } from "../middleware/toAuthenticateRoute.js"

const accountRouter = Router()

accountRouter.get("/account/balance", toAuthenticateRoute(), getBalance)
accountRouter.put("/account/transfer", toAuthenticateRoute(), toTranfer)

export default accountRouter