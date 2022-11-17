import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import userRepository, { UserInsertBody } from "../repository/userRepository.js"
import ErrorMessage from "../utils/errorMessage.js"

async function login(login:UserInsertBody){
    const { username, password } = login
    const user = await userRepository.findByName(username)
    if(!user) ErrorMessage(404, "Este username não existe.")
    const checkedPassword = bcrypt.compareSync(password, user.password)
    if(!checkedPassword) ErrorMessage(401, "Senha incorreta. Tente novamente.")
    const token = jwt.sign(
        {
            username:user.username,
            accountId:user.accountId
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'24h'
        }
    )
    return { token }
}

const authService = {
    login
}
export default authService