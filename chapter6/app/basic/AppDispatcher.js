import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
    dispatch(action = {}) {
        console.log("Dispatched", action);
        super.dispatch(action);
    }
}

// Dispatcher를 새로 생성한다?
export default new AppDispatcher();