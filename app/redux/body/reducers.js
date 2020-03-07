import DRAFT_BODY from './constants';

export default (state = '', action) => {
    switch (action.type) {
      case DRAFT_BODY:
        return action.body
  
      default:
        return state;
    }
  
  };
  