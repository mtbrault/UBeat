import { handleActions } from 'redux-actions';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';

const initialState = {
  collections: {},
  artists: {},
  tracks: {},
};

export const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT';
export const GET_SEARCH_ALBUM = 'GET_SEARCH_ALBUM';

const SUCCEEDED = 'SUCCEEDED';
export default handleActions(
  {
    [`${GET_SEARCH_RESULT}_${SUCCEEDED}`]: (state, { payload }) => {
      const groupedBywrappedType = groupBy(payload, 'wrapperType');
      const tracks = { ...state.collections, ...keyBy(groupedBywrappedType.track, 'trackId') };
      const collections = { ...state.collections, ...keyBy(groupedBywrappedType.collection, 'collectionId') };
      const artists = { ...state.artists, ...keyBy(groupedBywrappedType.artist, 'artistId') };
      return {
        artists,
        collections,
        tracks,
      };
    },
  },
  initialState,
);
