import { JwtPayload } from "jsonwebtoken"
import accountRepository from "../repository/accountRepository.js"
import userRepository from "../repository/userRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import successMessage from "../utils/successMessage.js"

export type TransferData = {
    transferToName:string,
    amount:number
}

async function getBalance(accountId:number){
    const account = await accountRepository.getAccount(accountId)
    if(!account) ErrorMessage(404, "Conta com ID inexistente.")
    return { balance:account.balance }
}

async function toTransfer(payload:JwtPayload, transfer:TransferData){
    const { username, accountId } = payload
    const { transferToName, amount } = transfer
    if(username === transferToName) ErrorMessage(406, "Não é possível fazer transferencias para você mesmo.")
    const balance = await checkBalence(accountId, amount)
    const userToTransfer = await userRepository.findByName(transferToName)
    if(!userToTransfer) ErrorMessage(404, "O usuário para o qual você quer transferir não existe.")
    if(!userToTransfer.accountId) ErrorMessage(406, "Não existe conta associada a este usuário.")
    await cashIn(userToTransfer.accountId, amount)
    await cashOut(accountId, amount)
    return successMessage("Tranferencia realizada com sucesso.")
}
async function checkBalence(accountId:number, amount:number){
    const { balance } = await getBalance(accountId)
    if(balance < amount) ErrorMessage(406, "Saldo insulficiente.")
    return balance
}

async function cashIn(accountId:number, amount:number){
    const accountBalance = await getBalance(accountId)
    const newBalance = accountBalance.balance + amount
    const result = await accountRepository.updateBalance(accountId, newBalance)
    if(!result) ErrorMessage(400, "Ocorreu um erro no cash-in.")
}
async function cashOut(accountId:number, amount:number){
    const accountBalance = await getBalance(accountId)
    const newBalance = accountBalance.balance - amount
    const result = await accountRepository.updateBalance(accountId, newBalance)
    if(!result) ErrorMessage(400, "Ocorreu um erro no cash-out.")
}

const accountService = {
    getBalance,
    toTransfer
}
export default accountService