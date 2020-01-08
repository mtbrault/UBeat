import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/ApiManager';
import {
  REGISTER_USER, LOGIN_USER, TOKEN_INFO, LOGOUT_USER,
  FOLLOW_USER_BY_ID, UNFOLLOW_USER_BY_ID,
} from '../reducers/authReducers';

export const loginUser = createActionThunk(LOGIN_USER, async (email, password) => {
  const res = await APIManager.loginUser(email, password);
  return res;
});

export const registerUser = createActionThunk(REGISTER_USER, async (name, email, password) => {
  const res = await APIManager.registerUser(name, email, password);
  return res;
});

export const tokenInfo = createActionThunk(TOKEN_INFO, async (token) => {
  const res = await APIManager.getTokenInfo(token);
  return res;
});

export const logoutUser = createActionThunk(LOGOUT_USER, async () => {
  const res = await APIManager.logoutUser();
  return res;
});


export const followUserById = createActionThunk(FOLLOW_USER_BY_ID, async (userId) => {
  const res = await APIManager.followUserById(userId);
  return res.data;
});

export const unFollowUserById = createActionThunk(UNFOLLOW_USER_BY_ID, async (userId) => {
  const res = await APIManager.unFollowUserById(userId);
  return res.data;
});
