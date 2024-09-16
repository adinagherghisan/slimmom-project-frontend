import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message as notificationMessage } from "antd";

axios.defaults.baseURL = 'http://localhost:5000';

export const fetchSearchProducts = createAsyncThunk(
    'products/search',
    async ({ query }, thunkAPI) => {
        try {
            const response = await axios.get(`/api/products/search?query=${query}`);
            console.log('Search prod:', response.data.products);
            return response.data.products;  
        } catch (error) {
            if (error.response && error.response.status === 404) {
                notificationMessage.error("Product not found!");
            } else {
                notificationMessage.error("Failed to search product!");
            }
            return thunkAPI.rejectWithValue(error.message || "An error occurred");
        }
    }
);