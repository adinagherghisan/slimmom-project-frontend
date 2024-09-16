import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message as notificationMessage } from "antd";

axios.defaults.baseURL = 'http://localhost:5000';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/register', credentials);
      console.log(res.data);
      if (res.status === 201) {
        notificationMessage.success('Registartion successfully!')
      }
      return res.data;
    } catch (error) {
  if (error.response && error.response.status === 400) {
    notificationMessage.error('Validation error!');
  } else if (error.response && error.response.status === 409) {
    notificationMessage.error('Email already registered!');
  } else {
    notificationMessage.error('Unexpected error. Please try again later.');
  }
  return thunkAPI.rejectWithValue(error.message);
}
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      const { token, user } = res.data;
      setAuthHeader(token);
      if (res.status === 200) {
        notificationMessage.success(`Welcome ${user.name}!`)
      }
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
    notificationMessage.error('Validation error!');
  } else if (error.response && error.response.status === 401) {
    notificationMessage.error('Email or password is wrong!');
  } else {
    notificationMessage.error('Unexpected error. Please try again later.');
  }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/api/auth/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOutUser',
  async (_, thunkAPI) => {
  try {
    await axios.get('/api/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});