import statusMessage from './actions';

export const checkError = (dispatch, e) => {
    switch(e) {
        case 403:
            dispatch(statusMessage({
                status: 'FAIL',
                message: 'You do not have permission to perform this action. Contact an administator'
            }));
            break;

        case 400:
            dispatch(statusMessage({
                status: 'FAIL',
                message: 'The information you have provided is not valid.'
            }))
            break;
        
        default:
            dispatch(statusMessage({
                status: 'FAIL',
                message: 'There was an error processing your request. Try again later'
            }));
            break;
    }
}

export const checkSuccess = (dispatch, e) => {
    switch(e) {
        case 204:
            dispatch(statusMessage({
                status: 'SUCCESS',
                message: 'Successfully deleted!'
            }))

        case 200:
            dispatch(statusMessage({
                status: 'SUCCESS',
                message: 'Successfully edited!'
            }))

        default:
            dispatch(statusMessage({
                status: 'SUCCESS',
                message: 'Request successfu!'
            }))
    }
}