import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message as notificationMessage } from "antd";

axios.defaults.baseURL = 'http://localhost:5000';

export const fetchPublicRecommendations = createAsyncThunk(
    'recommendations/public',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post('/api/products/public-recommendations', userData);
            if (response.status === 200) {
                console.log('Fetched public recommendation:', response.data);
            }
            return response.data;
        } catch (error) {
            
            if (error.response && error.response.status === 500) {
                notificationMessage.error('Something went wrong!');
            };
            return thunkAPI.rejectWithValue(error.response?.data?.message);
            
        }
    }
);

export const fetchPrivateRecommendations = createAsyncThunk(
    'recommendations/private',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post('/api/products/private-recommendations', userData);
            if (response.status === 200) {
                console.log('Fetched private recommendation:', response.data);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 500) {
                notificationMessage.error('Something went wrong!');
            };
            return thunkAPI.rejectWithValue(error.response?.data?.message);
            
        }
    }
);