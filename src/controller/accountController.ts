import { Request, Response } from "express"

import accountService, { TransferData } from "../service/accountService.js"

export async function getBalance(req:Request, res:Response){
    const { accountId } = res.locals.payload
    const result = await accountService.getBalance(accountId)
    return res.status(200).json(result)
}

export async function toTranfer(req:Request, res:Response){
    const { payload } = res.locals
    const { body } = res.locals
    const transfer:TransferData = {
        transferToName:body.transferToName,
        amount:parseFloat(body.amount)
    }
    const result = await accountService.toTransfer(payload, transfer)
    return res.status(200).json(result)
}
