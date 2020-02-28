import STATUS_MESSAGE from './constants';

export default statusMessage => {
    return {
        type: STATUS_MESSAGE,
        statusMessage,
    }
}