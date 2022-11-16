import bcrypt from "bcrypt"

import userRepository, { UserInsertBody } from "../repository/userRepository.js"
import accountRepository from "../repository/accountRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import successMessage from "../utils/successMessage.js"
import { Users } from "@prisma/client"

async function create(user:UserInsertBody){
    const { username, password } = user
    const existingUser = await userRepository.findByName(username)
    if(existingUser) ErrorMessage(409, "Já existe usuário com este username.")
    const cryptedPassword = bcrypt.hashSync(password, 10)
    const newUser = {
        username,
        password: cryptedPassword
    }
    const savedUser = await userRepository.create(newUser)
    if(!savedUser) ErrorMessage(409, "Não foi possível criar o usuário.")
    const account = await accountRepository.create({ balance:100 })
    if(!account) ErrorMessage(409, "Não foi possível criar uma conta.")
    const finalUser:Users = {...savedUser, accountId:account.id}
    const updatedUser = await userRepository.update(finalUser)
    if(!updatedUser) ErrorMessage(409, "Não foi possível adicionar uma conta ao usuario criado.")
    return successMessage("Usuário criado com sucesso!")
}

const userService = {
    create
}
export default userService