import accountRepository from "../repository/accountRepository.js"
import ErrorMessage from "../utils/errorMessage.js"

async function getBalance(accountId:number){
    const account = await accountRepository.getAccount(accountId)
    if(!account) ErrorMessage(404, "Conta com ID inexistente.")
    return {balance:account.balance}
}

const accountService = {
    getBalance
}
export default accountService