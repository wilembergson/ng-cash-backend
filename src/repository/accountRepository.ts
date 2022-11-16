import { Accounts } from "@prisma/client"

import prisma from "../config/database.js"

type AccountInsertBody = Omit<Accounts, "id">

async function create(body:AccountInsertBody){
    return await prisma.accounts.create({
        data: body
    })
}

const accountRepository = {
    create
}
export default accountRepository