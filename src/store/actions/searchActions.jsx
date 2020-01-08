import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/ApiManager';
import { GET_SEARCH_RESULT, GET_SEARCH_ALBUM } from '../reducers/searchReducers';

export const getSearch = createActionThunk(GET_SEARCH_RESULT, async (q, limit = 10) => {
  const { data: { results } } = await APIManager.search(q, limit);
  const { data } = await APIManager.searchUser(q);
  const userData = data.map((e) => ({
    wrapperType: 'user',
    ...e,
  }));
  return [...results, ...userData];
});

export const getSearchAlbum = createActionThunk(GET_SEARCH_ALBUM, async () => {
  //   const res = await APIManager.getAlbumWithTracks(id);
  //   return res.data;
}, true);
