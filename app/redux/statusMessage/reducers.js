import STATUS_MESSAGE from './constants';

export default (state = {}, action) => {
    switch(action.type) {
        case STATUS_MESSAGE:
            return action.statusMessage;

        default:
            return state;
    }
}