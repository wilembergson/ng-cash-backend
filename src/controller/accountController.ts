import { Request, Response } from "express"

import accountService from "../service/accountService.js"

export async function getBalance(req:Request, res:Response){
    const { accountId } = res.locals.payload
    const result = await accountService.getBalance(accountId)
    return res.status(200).json(result)
}
