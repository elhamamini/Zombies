import { SET_TAGS, SET_WHITELIST, SET_ACTIVE } from './constants';

const initState = {
  all: [],
  active: [],
  whitelist: {}
}

export const tags = (state=initState, action) => {
  switch (action.type) {
    case SET_TAGS:
      return { ...state, all: action.tags };
    case SET_WHITELIST:
      return {
        ...state,
        whitelist: state.all.reduce((accum, curr) => {
          accum[curr.name] = curr.id;
          return accum;
        }, {})
      };
    case SET_ACTIVE:
      return {
        ...state,
        active: state.all.reduce((accum, cur) => {
          if (cur.conversations.length) {
            accum.push({ name: cur.name, id: cur.id })
          }
          return accum;
        }, [])
      }
    default:
      return state;
  }
};

