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

const accountRepository = {
    create,
    getAccount
}
export default accountRepository