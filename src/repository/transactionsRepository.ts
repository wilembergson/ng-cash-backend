import { Transactions } from "@prisma/client"

import prisma from "../config/database.js"

export type TransactionInsertData = Omit<Transactions, "id">   

async function create(body:TransactionInsertData){
    return await prisma.transactions.create({
        data: body
    })
}

const transactionsRepository = {
    create
}
export default transactionsRepository