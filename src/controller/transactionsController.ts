import { Request, Response } from "express"

import transactionsService from "../service/transactionsService.js"

export async function myTransictions(req:Request, res:Response){
    const { accountId } = res.locals.payload
    const result = await transactionsService.myTransictions(accountId)
    return res.status(200).send(result)
}

export async function filterByDate(req:Request, res:Response){
    const { accountId } = res.locals.payload
    const result = await transactionsService.filterByDate(accountId)
    return res.status(200).send(result)
}

export async function filterByCashIn(req:Request, res:Response){
    const { accountId } = res.locals.payload
    const result = await transactionsService.filterByCashIn(accountId)
    return res.status(200).send(result)
}

export async function filterByCashOut(req:Request, res:Response){
    const { accountId } = res.locals.payload
    const result = await transactionsService.filterByCashOut(accountId)
    return res.status(200).send(result)
}