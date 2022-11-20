import transactionsRepository from "../repository/transactionsRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import warnningMessage from "../utils/warnningMessage.js"

async function myTransictions(accountId:number){
    const transactions = await transactionsRepository.getTransactions(accountId)
    if(!transactions) ErrorMessage(404, "Não foi possível obter suas transações.")
    if(transactions.length === 0) return warnningMessage("Ainda não há nenhuma transação relacionada à sua conta")
    return transactions
}

async function filterByDate(accountId:number){
    const transactions:any = await myTransictions(accountId)
    return transactions.sort((a,b) => b.createdAt - a.createdAt)
}

async function filterByCashIn(accountId:number){
    const transactions:any = await filterByDate(accountId)
    return transactions.filter(item => item.creditedAccountId === accountId)
}

async function filterByCashOut(accountId:number){
    const transactions:any = await filterByDate(accountId)
    return transactions.filter(item => item.debitedAccountId === accountId)
}

const transactionsService = {
    myTransictions,
    filterByDate,
    filterByCashIn,
    filterByCashOut
}
export default transactionsService