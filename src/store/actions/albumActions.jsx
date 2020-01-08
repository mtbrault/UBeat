import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/ApiManager';
import { GET_DISCOVER_ALBUMS, GET_ALBUM_WITH_TRACKS } from '../reducers/albumReducers';

export const getDiscoverAlbums = createActionThunk(GET_DISCOVER_ALBUMS, async () => {
  const { data: { results } } = await APIManager.getDiscoverAlbums();
  return results;
});

export const getAlbumWithTracks = createActionThunk(GET_ALBUM_WITH_TRACKS, async (id) => {
  const res = await APIManager.getAlbumWithTracks(id);
  return res.data;
}, true);
