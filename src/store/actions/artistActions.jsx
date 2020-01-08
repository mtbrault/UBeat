import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/ApiManager';
import { GET_DISCOVER_ARTISTS, GET_ARTIST_WITH_ALBUMS } from '../reducers/artistReducers';

export const getDiscoverArtists = createActionThunk(GET_DISCOVER_ARTISTS, async () => {
  const { data: { results } } = await APIManager.getDiscoverArtists();
  return results;
});

export const getArtistWithAlbums = createActionThunk(GET_ARTIST_WITH_ALBUMS, async (id) => {
  const { data } = await APIManager.getArtistWithAlbums(id);
  return data;
});
