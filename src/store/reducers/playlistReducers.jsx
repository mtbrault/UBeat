import { handleActions } from 'redux-actions';

const initialState = {
  myPlaylists: [],
  userPlayLists: [],
  playlists: {},
  loading: false,
};

export const GET_USER_PLAYLIST = 'GET_USER_PLAYLIST';
export const GET_MY_PLAYLISTS = 'GET_MY_PLAYLISTS';
export const GET_PLAYLIST_BY_ID = 'GET_PLAYLIST_BY_ID';
export const POST_TRACK_TO_PLAYLISTS = 'POST_TRACK_TO_PLAYLISTS';
export const DELETE_TRACK_PLAYLIST = 'DELETE_TRACK_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
export const PUT_PLAYLIST = 'PUT_PLAYLIST';

const SUCCEEDED = 'SUCCEEDED';
const STARTED = 'STARTED';
const ENDED = 'ENDED';

export default handleActions(
  {
    [`${GET_MY_PLAYLISTS}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, myPlaylists: payload }),
    [`${GET_USER_PLAYLIST}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, userPlayLists: payload }),
    [`${GET_PLAYLIST_BY_ID}_${SUCCEEDED}`]: ({ playlists, ...state }, { payload }) => ({ ...state, playlists: { ...playlists, [payload.id]: payload }, loading: false }),
    [`${DELETE_TRACK_PLAYLIST}_${SUCCEEDED}`]: ({ playlists, ...state }, { payload }) => ({ ...state, playlists: { ...playlists, [payload.id]: payload }, loading: false }),
    [`${POST_TRACK_TO_PLAYLISTS}_${STARTED}`]: (state) => ({ ...state, loading: true }),
    [`${POST_TRACK_TO_PLAYLISTS}_${SUCCEEDED}`]: ({ playlists, ...state }, { payload }) => ({ ...state, playlists: { ...playlists, [payload.id]: payload }, loading: false }),
    [`${POST_TRACK_TO_PLAYLISTS}_${ENDED}`]: (state) => ({ ...state, loading: false }),
    [`${DELETE_PLAYLIST}_${SUCCEEDED}`]: (state) => ({ ...state, loading: false }),
    [`${PUT_PLAYLIST}_${SUCCEEDED}`]: (state) => ({ ...state, loading: false }),
    [`${CREATE_PLAYLIST}_${SUCCEEDED}`]: ({ myPlaylists, ...state }, { payload }) => myPlaylists.push(payload) && ({ ...state, myPlaylists, loading: false }),
  },
  initialState,
);
