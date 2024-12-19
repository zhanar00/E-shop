import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Button from "../components/common/Button";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * item.quantity,
    0
  );

  const getColorName = (colorCode, colors) => {
    const color = colors.find((color) => color.code === colorCode);
    return color ? color.name : colorCode; // Если цвет найден, выводим его название, иначе код
  };

  return (
    <>
      <Header />
      <div className="cart-page container mx-auto p-8 mt-20">
        {/* Заголовок страницы */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          Your cart items
        </h1>

        <Button />

        {/* Проверка на пустую корзину */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {/* Шапка корзины */}
            <div className="grid grid-cols-5 font-semibold text-gray-600 mb-4 border-b pb-2">
              <p className="col-span-2">Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>

            {/* Список товаров */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center mb-4 border-b pb-4"
              >
                {/* Product */}
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    {item.selectedColor && (
                      <p className="text-sm text-gray-500">
                        Color: {getColorName(item.selectedColor, item.colors)} {/* Выводим название цвета */}
                      </p>
                    )}
                    {item.selectedSize && (
                      <p className="text-sm text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price */}
                <p>${(Number(item.price) || 0).toFixed(2)}</p>

                {/* Quantity */}
                <p>{item.quantity}</p>

                {/* Total */}
                <div className="flex items-center justify-between">
                  <p>${((Number(item.price) || 0) * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Итог корзины */}
            <div className="flex justify-between items-center mt-8">
              <div>
                <p className="text-xl font-semibold">
                  Sub-total: ${(Number(totalAmount) || 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Tax and shipping cost will be calculated later
                </p>
              </div>
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:underline"
              >
                Clear Cart
              </button>
            </div>

            {/* Кнопка "Check-out" */}
            <div className="text-center mt-8">
              <button onClick={handleCheckout}
                      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
