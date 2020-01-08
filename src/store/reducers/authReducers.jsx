import { handleActions } from 'redux-actions';

const initialState = {
  email: '',
  name: '',
  token: '',
  id: '',
  error: false,
  following: [],
};

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const TOKEN_INFO = 'TOKEN_INFO';

export const FOLLOW_USER_BY_ID = 'FOLLOW_USER_BY_ID';
export const UNFOLLOW_USER_BY_ID = 'UNFOLLOW_USER_BY_ID';

const SUCCEEDED = 'SUCCEEDED';
const FAILED = 'FAILED';

export default handleActions(
  {
    [`${LOGIN_USER}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload.data, error: '' }),
    [`${LOGIN_USER}_${FAILED}`]: (state) => ({ ...state, error: 'Connexion failed' }),
    [`${TOKEN_INFO}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload.data, error: '' }),
    [`${TOKEN_INFO}_${FAILED}`]: (state) => ({ ...state, error: 'Invalid token' }),
    [`${LOGOUT_USER}_${SUCCEEDED}`]: () => (initialState),

    [`${FOLLOW_USER_BY_ID}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, following: payload.following }),
    [`${UNFOLLOW_USER_BY_ID}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, following: payload.following }),
  },
  initialState,
);
