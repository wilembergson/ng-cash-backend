import { Users } from "@prisma/client"

import prisma from "../config/database.js"

export type UserInsertBody = {
    username:string,
    password:string
}

async function create(body:UserInsertBody){
    return await prisma.users.create({
        data: body
    })
}

async function update(user:Users){
    return await prisma.users.update({
        where:{
            id:user.id
        },
        data:user
    })
}

async function findByName(username:string){
    return await prisma.users.findFirst({
        where:{
            username
        }
    })
}

const userRepository = {
    create,
    update,
    findByName
}
export default userRepository