// // src/redux/cartSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [], // Массив товаров в корзине
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       // Логируем добавляемый товар
//       console.log("Добавление товара:", action.payload);

//       const existingItem = state.items.find(
//         (item) => item.id === action.payload.id
//       );

//       if (existingItem) {
//         // Логируем обновление количества, если товар уже есть в корзине
//         console.log(
//           "Товар уже есть, увеличиваем количество:",
//           existingItem.quantity + action.payload.quantity
//         );
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         // Логируем добавление нового товара
//         console.log("Товар новый, добавляем в корзину");
//         state.items.push(action.payload);
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Загружаем корзину из localStorage при инициализации
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const initialState = {
  items: loadCartFromStorage(), // Инициализация корзины из localStorage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      // Сохраняем корзину в localStorage
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

