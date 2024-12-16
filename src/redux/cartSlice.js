// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Массив товаров в корзине
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Логируем добавляемый товар
      console.log("Добавление товара:", action.payload);

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Логируем обновление количества, если товар уже есть в корзине
        console.log(
          "Товар уже есть, увеличиваем количество:",
          existingItem.quantity + action.payload.quantity
        );
        existingItem.quantity += action.payload.quantity;
      } else {
        // Логируем добавление нового товара
        console.log("Товар новый, добавляем в корзину");
        state.items.push(action.payload);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
