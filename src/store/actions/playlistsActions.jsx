import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/ApiManager';
import {
  GET_MY_PLAYLISTS,
  GET_USER_PLAYLIST,
  GET_PLAYLIST_BY_ID,
  POST_TRACK_TO_PLAYLISTS,
  DELETE_TRACK_PLAYLIST,
  DELETE_PLAYLIST,
  CREATE_PLAYLIST,
  PUT_PLAYLIST,
} from '../reducers/playlistReducers';

export const getUserPlayList = createActionThunk(GET_USER_PLAYLIST, async (userId) => {
  const { data } = await APIManager.getUserPlayList(userId);
  return data;
});

export const getMyPlayList = createActionThunk(GET_MY_PLAYLISTS, async (userId) => {
  const { data } = await APIManager.getUserPlayList(userId);
  return data;
});

export const putPlaylist = createActionThunk(PUT_PLAYLIST, async (playlistId, name) => {
  const { data } = await APIManager.putPlaylist(playlistId, name);
  return data;
});

export const getPlaylistById = createActionThunk(GET_PLAYLIST_BY_ID, async (playlistId) => {
  const res = await APIManager.getPlaylistById(playlistId);
  return res.data;
});

export const deletePlaylist = createActionThunk(DELETE_PLAYLIST, async (playlistId) => {
  const res = await APIManager.deletePlaylist(playlistId);
  return res.data;
});

export const deleteTrackOfPlaylist = createActionThunk(
  DELETE_TRACK_PLAYLIST,
  async (playlistId, trackId) => {
    const res = await APIManager.deleteTrackOfPlaylist(playlistId, trackId);
    return res.data;
  },
);

export const createPlaylist = createActionThunk(CREATE_PLAYLIST, async (name, owner) => {
  const { data } = await APIManager.createPlaylist(name, owner);
  return data;
});

export const postTrackToPlaylist = createActionThunk(
  POST_TRACK_TO_PLAYLISTS,
  async (idPlaylist, tracks) => {
    const result = [];
    for (let i = 0; i < tracks.length; i += 1) {
      result.push(APIManager.postTrackToPlaylist(idPlaylist, tracks[i]));
    }
    return Promise.all(result);
  },
);
