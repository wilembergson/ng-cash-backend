import { Accounts } from "@prisma/client"

import prisma from "../config/database.js"

type AccountInsertBody = Omit<Accounts, "id">

async function create(body:AccountInsertBody){
    return await prisma.accounts.create({
        data: body
    })
}

async function getAccount(id:number){
    return await prisma.accounts.findFirst({
        where:{
            id
        }
    })
}

async function updateBalance(id:number, balance:number){
    return await prisma.accounts.update({
        where:{
            id
        },
        data:{
            balance
        }
    })
}

const accountRepository = {
    create,
    getAccount,
    updateBalance
}
export default accountRepository