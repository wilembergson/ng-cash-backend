import { Router } from "express"

import { getBalance } from "../controller/accountController.js"
import { toAuthenticateRoute } from "../middleware/toAuthenticateRoute.js"

const accountRouter = Router()

accountRouter.get("/account/balance", toAuthenticateRoute(), getBalance)

export default accountRouter