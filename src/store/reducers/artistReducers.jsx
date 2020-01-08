import { handleActions } from 'redux-actions';

const initialState = {
  discoverArtists: [],
  artists: {},
};

export const GET_DISCOVER_ARTISTS = 'GET_DISCOVER_ARTISTS';
export const GET_ARTIST_WITH_ALBUMS = 'GET_ARTIST_WITH_ALBUMS';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions(
  {
    [`${GET_DISCOVER_ARTISTS}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, discoverArtists: payload }),
    [`${GET_ARTIST_WITH_ALBUMS}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, artists: { [payload.artistId]: payload } }),
  },
  initialState,
);
