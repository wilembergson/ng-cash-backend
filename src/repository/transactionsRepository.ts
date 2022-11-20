import { Transactions } from "@prisma/client"

import prisma from "../config/database.js"

export type TransactionInsertData = Omit<Transactions, "id">   

async function create(body:TransactionInsertData){
    return await prisma.transactions.create({
        data: body
    })
}

async function getTransactions(accountId:number){
    return await prisma.transactions.findMany({
        where:{
            OR:[
                { creditedAccountId:accountId },
                { debitedAccountId:accountId }
            ]
        },
    })
}

const transactionsRepository = {
    create,
    getTransactions
}
export default transactionsRepository