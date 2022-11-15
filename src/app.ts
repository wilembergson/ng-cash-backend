import express, { json } from "express"
import cors from "cors"
import "express-async-errors"

import errorHandler from "./middleware/errorHandler.js"
import router from "./router/routers.js"

const app = express()

app.use(json())
app.use(cors())

app.use(router)
app.use(errorHandler)

export default app