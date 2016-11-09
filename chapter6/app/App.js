import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

import BankBalanceStore from './BankBalanceStore';
import BankActions from './BankActions';
import AppDispatcher from './AppDispatcher';
import bankConstants from './Constants';

class App extends Component {
    constructor() {
        super(...arguments);
        BankActions.createAccount();
        this.state = {
            balance: BankBalanceStore.getState()
        }
    }

    componentDidMount() {
        this.storeSubscription = BankBalanceStore.addListener(data => this.handleStoreChange(data));
    }

    componentWillUnmount() {
        this.storeSubscription.remove();
    }

    handleStoreChange() {
        console.log('call handleStoreChange');
        this.setState({balance: BankBalanceStore.getState()});
    }

    //입금
    deposit() {
        //BankActions.depositIntoAccount(Number(this.refs.amount.value));
        AppDispatcher.dispatch({
            type: bankConstants.DEPOSITED_INTO_ACCOUNT,
            amount: Number(this.refs.amount.value)
        });
        this.refs.amount.value = '';
    }

    //출금
    withdraw() {
        BankActions.withdrawFromAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';
    }

    render() {
        return (
            <div>
                <header>Flux Test</header>
                <h1>You Balance is ${(this.state.balance).toFixed(2)}</h1>
                <div className="atm">
                    <input type="text" placeholder="Enter Amount" ref="amount" />
                    <br />
                    <button onClick={this.withdraw.bind(this)}>Withdraw</button>
                    <button onClick={this.deposit.bind(this)}>Deposit</button>
                </div>
            </div>
        )
    }
}

render(<App />, document.getElementById('root'));
