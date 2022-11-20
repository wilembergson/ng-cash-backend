import { Request, Response } from "express"

import transactionsService from "../service/transactionsService.js"

export async function myTransictions(req:Request, res:Response){
    const { accountId } = res.locals.payload
    const result = await transactionsService.myTransictions(accountId)
    return res.status(200).send(result)
}