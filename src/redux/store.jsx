// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';   // Import cart reducer
import authReducer from './authSlice';   // Import auth reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,   // Reducer for managing cart state
    auth: authReducer,   // Reducer for managing authentication state
  },
});

export default store;
