import AppDispatcher from './AppDispatcher';
import bankConstants from './Constants';

let BankActions = {

    //최초 생성
    createAccount() {
        console.log('Call CreateAccount')
        AppDispatcher.dispatch({
            type: bankConstants.CREATED_ACCOUNT,
            amount: 0
        });
    },
    // 입금
    depositIntoAccount(amount) {
        AppDispatcher.dispatch({
            type: bankConstants.DEPOSITED_INTO_ACCOUNT,
            amount: amount
        });
    },
    // 출금
    withdrawFromAccount(amount) {
        AppDispatcher.dispatch({
            type: bankConstants.WITHDREW_FROM_ACCOUNT,
            amount: amount
        });
    }

}

export default BankActions;