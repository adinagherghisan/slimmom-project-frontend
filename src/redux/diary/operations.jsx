import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message as notificationMessage } from "antd";

axios.defaults.baseURL = 'http://localhost:5000';

export const fetchDiaryConsumed = createAsyncThunk(
    'product/consumed',
    async ({ productId, product_weight }, thunkAPI) => {
        try {
            const response = await axios.post('/api/diary/consumed', { productId, product_weight });
            if (response.status === 201) {
                return response.data;
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                return thunkAPI.rejectWithValue('Error adding product');
            }
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
    }
);

export const fetchRemoveProduct = createAsyncThunk(
    'product/removedProduct',
    async ({ date, productId }, thunkAPI) => {
        try {
            const response = await axios.delete(`/api/diary/remove/${date}/${productId}`);
        
            if (response.status === 200) {
                notificationMessage.success("Successfully removed product from diary!");
            }
            return response.data;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    notificationMessage.error("Product not found in diary for this date!");
                } else {
                    notificationMessage.error("Failed to remove product from diary.");
                }
            } else {
                notificationMessage.error("An error occurred while removing product from diary.");
            }
            
            return thunkAPI.rejectWithValue(error.message || "An error occurred");
        }
    }
);
export const fetchAllProducts = createAsyncThunk(
    'products/getAll',
    async ({ date }, thunkAPI) => {
        try {
            const response = await axios.get(`/api/diary/consumed/${date}`);
            if (response.status === 200) {
                console.log("Get all consumed products for a specific date:", response.data);
                notificationMessage.success(`Successfully found consumed products for ${date}!`);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                notificationMessage.error("No diary entry found for this date!");
            } else {
                notificationMessage.error("Failed to fetch consumed products.");
            }
            return thunkAPI.rejectWithValue(error.message || "An error occurred");
        }
    }
);