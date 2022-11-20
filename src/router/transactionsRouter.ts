import { Router } from "express"

import { myTransictions } from "../controller/transactionsController.js"
import { toAuthenticateRoute } from "../middleware/toAuthenticateRoute.js"

const transactionsRouter = Router()

transactionsRouter.get("/myTransactions", toAuthenticateRoute(null), myTransictions)

export default transactionsRouter