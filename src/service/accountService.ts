import { JwtPayload } from "jsonwebtoken"
import accountRepository from "../repository/accountRepository.js"
import transactionsRepository, { TransactionInsertData } from "../repository/transactionsRepository.js"
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
    return { balance:parseFloat((account.balance).toFixed(2)) }
}

async function toTransfer(payload:JwtPayload, transfer:TransferData){
    const { username, accountId } = payload
    const { transferToName, amount } = transfer
    if(username === transferToName) ErrorMessage(406, "Não é possível fazer transferencias para você mesmo.")
    await checkBalence(accountId, amount)
    const userToTransfer = await userRepository.findByName(transferToName)
    if(!userToTransfer) ErrorMessage(404, "O usuário para o qual você quer transferir não existe.")
    if(!userToTransfer.accountId) ErrorMessage(406, "Não existe conta associada a este usuário.")
    const credited = await cashIn(userToTransfer.accountId, amount)
    const debited = await cashOut(accountId, amount)
    const transation:TransactionInsertData = {
        debitedAccountId: debited.id,
        creditedAccountId: credited.id,
        value:amount,
        createdAt: new Date
    }
    const trans = await transactionsRepository.create(transation)
    if(!trans) ErrorMessage(404, "Não foi possível realizar a transação.")
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
    const result = await accountRepository.updateBalance(accountId, parseFloat(newBalance.toFixed(2)))
    if(!result) ErrorMessage(400, "Ocorreu um erro no cash-in.")
    return result
}
async function cashOut(accountId:number, amount:number){
    const accountBalance = await getBalance(accountId)
    const newBalance = accountBalance.balance - amount
    const result = await accountRepository.updateBalance(accountId, parseFloat(newBalance.toFixed(2)))
    if(!result) ErrorMessage(400, "Ocorreu um erro no cash-out.")
    return result
}

const accountService = {
    getBalance,
    toTransfer
}
export default accountService