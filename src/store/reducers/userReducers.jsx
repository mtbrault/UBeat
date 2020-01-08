import { handleActions } from 'redux-actions';

const initialState = {
  searchedUser: null,
  error: false,
};

export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_PLAYLIST_BY_ID = 'GET_USER_PLAYLIST_BY_ID';

const SUCCEEDED = 'SUCCEEDED';
const STARTED = 'STARTED';
const FAILED = 'FAILED';

export default handleActions(
  {
    [`${GET_USER_BY_ID}_${STARTED}`]: (state) => ({ ...state, error: false }),
    [`${GET_USER_BY_ID}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, searchedUser: payload }),
    [`${GET_USER_BY_ID}_${FAILED}`]: (state) => ({ ...state, error: true }),
    [`${GET_USER_PLAYLIST_BY_ID}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, searchedUser: payload }),
  },
  initialState,
);
