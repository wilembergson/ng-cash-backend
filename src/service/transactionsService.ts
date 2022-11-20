import transactionsRepository from "../repository/transactionsRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import successMessage from "../utils/successMessage.js"

async function myTransictions(accountId:number){
    const transactions = await transactionsRepository.getTransactions(accountId)
    if(!transactions) ErrorMessage(404, "Não foi possível obter suas transações.")
    if(transactions.length === 0) return successMessage("Ainda não há nenhuma transação relacionada à sua conta")
    return transactions
}

const transactionsService = {
    myTransictions
}
export default transactionsService