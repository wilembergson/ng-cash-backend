import { Router } from "express"

import { filterByCashIn, filterByCashOut, filterByDate, myTransictions } from "../controller/transactionsController.js"
import { toAuthenticateRoute } from "../middleware/toAuthenticateRoute.js"

const transactionsRouter = Router()

transactionsRouter.get("/myTransactions", toAuthenticateRoute(null), myTransictions)
transactionsRouter.get("/myTransactions/bydate", toAuthenticateRoute(null), filterByDate)
transactionsRouter.get("/myTransactions/bycashin", toAuthenticateRoute(null), filterByCashIn)
transactionsRouter.get("/myTransactions/bycashout", toAuthenticateRoute(null), filterByCashOut)

export default transactionsRouter