import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { addToCart } from "../utils/cartUtils"; // Функция для добавления в корзину
import mockProducts from "../data/mockProducts";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';



const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Эмуляция загрузки продукта
  useEffect(() => {
    const productIdInt = parseInt(productId, 10); // Преобразуем в число
    console.log("productIdInt:", productIdInt);

    const productData = mockProducts.find(
      (product) => product.id === productIdInt
    );
    setProduct(productData);
  }, [productId]);

  // Если продукт не найден
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => (prev + amount > 0 ? prev + amount : 1));
  };

  const handleSubscriptionChange = () => {
    setIsSubscribed(!isSubscribed);
  };

  // const handleAddToCart = () => {
  //   addToCart(product, quantity, isSubscribed);
  //   alert("Product added to cart!");
  // };
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    alert('Product added to cart!');
  };

  return (
    <>
      <Header />
      <div className="product-detail-container mx-auto p-8 ">
        <div className="product-detail-content flex flex-col lg:flex-row">
          <div className="product-image-container flex-1 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="product-info flex-1 p-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-4 text-xl text-gray-700">{product.description}</p>
            <p className="mt-4 text-xl text-green-600">${product.price}</p>
            <p className="mt-2 text-sm text-gray-500">{product.shippingInfo}</p>

            {/* Quantity and Subscription */}
            <div className="mt-4 flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gray-300 p-2 rounded-l-md text-lg"
              >
                -
              </button>
              <span className="mx-2 text-xl">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="bg-gray-300 p-2 rounded-r-md text-lg"
              >
                +
              </button>
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                checked={isSubscribed}
                onChange={handleSubscriptionChange}
                id="subscribe"
                className="mr-2"
              />
              <label htmlFor="subscribe" className="text-lg">
                Subscribe every 4 weeks
              </label>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white p-3 rounded-md w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details mt-8">
          <h3 className="text-2xl font-semibold">Product Details</h3>
          <ul className="mt-4 text-lg text-gray-700">
            <li>
              <strong>Wax:</strong> {product.wax}
            </li>
            <li>
              <strong>Fragrance:</strong> {product.fragrance}
            </li>
            <li>
              <strong>Burning Time:</strong> {product.burningTime}
            </li>
            <li>
              <strong>Dimensions:</strong> {product.dimensions}
            </li>
            <li>
              <strong>Weight:</strong> {product.weight}
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
