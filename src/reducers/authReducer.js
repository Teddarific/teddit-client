import { ActionTypes } from '../actions';

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, { authenticated: true, username: action.payload.username });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, { authenticated: false, username: null });
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state, { authenticated: false, username: null });
    case ActionTypes.VALIDATE_USERNAME:
      return Object.assign({}, state, { validUsername: action.payload.valid });
    case ActionTypes.VALIDATE_EMAIL:
      return Object.assign({}, state, { validEmail: action.payload.valid });
    default:
      return state;
  }
};

export default AuthReducer;
