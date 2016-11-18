import {EventEmitter} from 'fbemitter';
import AppDispatcher from './AppDispatcher';
import bankConstants from './Constants';

const CHANGE_EVENT = 'change';
let __emitter = new EventEmitter();
let balance = 0;

let BankBalanceStore = {
    addListener: (callback) => {
        console.log('call add Listener');
        return __emitter.addListener(CHANGE_EVENT, callback);
    },
    getState() {
        return balance;
    }
};

BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
    console.log(action);
    switch(action.type) {
        case bankConstants.CREATED_ACCOUNT:
            balance = 0;
            __emitter.emit(CHANGE_EVENT);
            break;
        case bankConstants.DEPOSITED_INTO_ACCOUNT:
            balance = balance + action.amount;
            __emitter.emit(CHANGE_EVENT);
            break;
        case bankConstants.WITHDREW_FROM_ACCOUNT:
            balance = balance - action.amount;
            __emitter.emit(CHANGE_EVENT);
            break;n
    }

});


export default BankBalanceStore;