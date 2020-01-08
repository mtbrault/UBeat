import { handleActions } from 'redux-actions';

const initialState = {
  discoverAlbums: [],
  albums: {},
  loading: false,
  error: false,
};

export const GET_DISCOVER_ALBUMS = 'GET_DISCOVER_ALBUMS';
export const GET_ALBUM_WITH_TRACKS = 'GET_ALBUM_WITH_TRACKS';

const SUCCEEDED = 'SUCCEEDED';
const FAILED = 'FAILED';
const STARTED = 'STARTED';
const ENDED = 'ENDED';

export default handleActions(
  {
    [`${GET_DISCOVER_ALBUMS}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, discoverAlbums: payload }),

    [`${GET_ALBUM_WITH_TRACKS}_${STARTED}`]: (state) => ({ ...state, loading: true, error: false }),
    [`${GET_ALBUM_WITH_TRACKS}_${SUCCEEDED}`]: ({ albums, ...state }, { payload }) => ({ ...state, albums: { ...albums, [payload.collectionId]: payload }, loading: false }),
    [`${GET_ALBUM_WITH_TRACKS}_${FAILED}`]: (state) => ({ ...state, error: true, loading: false }),
    [`${GET_ALBUM_WITH_TRACKS}_${ENDED}`]: (state) => ({ ...state }),
  },
  initialState,
);
