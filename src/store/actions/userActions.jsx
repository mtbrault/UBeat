import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/ApiManager';
import {
  GET_USER_BY_ID,
} from '../reducers/userReducers';


export const getUserById = createActionThunk(GET_USER_BY_ID, async (userId) => {
  const res = await APIManager.getUserById(userId);
  return res.data;
});

export const getUsers = createActionThunk(GET_USER_BY_ID, async (userId) => {
  const res = await APIManager.getUserById(userId);
  return res.data;
});
