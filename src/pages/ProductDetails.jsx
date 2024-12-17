import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { addToCart } from "../utils/cartUtils"; // Функция для добавления в корзину
import mockProducts from "../data/mockProducts";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import Button from "../components/common/Button";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null); // Состояние для цвета
  const [selectedSize, setSelectedSize] = useState(null); // Состояние для размера

  const [reviews, setReviews] = useState([]); // Состояние для хранения отзывов
  const [averageRating, setAverageRating] = useState(0); // Общее среднее значение рейтинга
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 0 });
  const navigate = useNavigate();

  // Эмуляция загрузки продукта
  useEffect(() => {
    const productIdInt = parseInt(productId, 10); // Преобразуем в число
    console.log("productIdInt:", productIdInt);

    const productData = mockProducts.find(
      (product) => product.id === productIdInt
    );
    console.log("Loaded product:", productData);
    setProduct(productData);
  }, [productId]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => (prev + amount > 0 ? prev + amount : 1));
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size before adding to the cart.");
      return;
    }
    const productToAdd = {
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    };
    dispatch(addToCart(productToAdd));
    alert("Product added to cart!");
    navigate("/cart");
  };

  // Обновляем общий рейтинг при изменении отзывов
  useEffect(() => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avg = reviews.length ? total / reviews.length : 0;
    setAverageRating(avg.toFixed(1));
  }, [reviews]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text || !newReview.rating) {
      alert("Please fill in all fields and choose a rating!");
      return;
    }

    const updatedReviews = [...reviews, newReview];

    // Обновляем отзывы в состоянии
    setReviews(updatedReviews);

    // Сохраняем в localStorage
    localStorage.setItem(
      `reviews-${productId}`,
      JSON.stringify(updatedReviews)
    );

    // Сбрасываем форму
    setNewReview({ name: "", text: "", rating: 0 });
  };

  useEffect(() => {
    // Загружаем отзывы из localStorage
    const savedReviews = localStorage.getItem(`reviews-${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [productId]);

  // Если продукт не найден
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Header />
      <div className="flex justify-center mt-5">
        <Button />
      </div>

      <div className="product-detail-container mx-auto p-8 flex justify-center items-center min-h-screen max-w-screen-lg">
        <div className="product-detail-content flex flex-col lg:flex-row w-full">
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

            <div className="info flex">
              <div className="price-holder m-4 ml-0 p-4 pl-0">
                <p className="mt-4 text-xl text-green-600">${product.price}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {product.shippingInfo}
                </p>
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
              </div>

              <div className="select-properties p-4">
                {/* Colors */}
                {product.colors && (
                  <div className="mt-4">
                    <p>Colors:</p>
                    {product.colors.map((color) => (
                      <button
                        key={color.code}
                        style={{
                          backgroundColor: color.code,
                          display: "inline-block",
                          width: "40px",
                          height: "40px",
                          margin: "5px",
                          cursor: "pointer",
                          border:
                            selectedColor === color.code
                              ? "2px solid black"
                              : "none",
                        }}
                        title={color.name}
                        onClick={() => setSelectedColor(color.code)} // Сохраняем выбранный цвет
                      ></button>
                    ))}
                  </div>
                )}

                {/* Sizes */}
                <div>
                  <p>Sizes:</p>
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size) => (
                      <button
                        key={size}
                        style={{
                          margin: "5px",
                          padding: "5px 10px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          cursor: "pointer",
                          border:
                            selectedSize === size
                              ? "2px solid black"
                              : "1px solid #ccc",
                        }}
                        onClick={() => setSelectedSize(size)} // Сохраняем выбранный размер
                      >
                        {size}
                      </button>
                    ))
                  ) : (
                    <p>No sizes available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white p-3 rounded-md w-full"
              >
                Add to Cart
              </button>
              <div className="mt-4">
                <p>
                  Rating:{" "}
                  <span className="text-yellow-500">{averageRating} ★</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Отзывы */}
      <div className="reviews-section mx-auto p-8 flex max-w-screen-lg">
        <div className="your-review min-w-80">
          <h2 className="text-2xl font-bold mb-4 mr-4">Your review</h2>
          <form onSubmit={handleReviewSubmit} className="mb-8">
            <input
              type="text"
              placeholder="Your name"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              placeholder="Your review"
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            ></textarea>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  style={{
                    cursor: "pointer",
                    color: newReview.rating >= star ? "gold" : "gray",
                    fontSize: "24px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
            >
              Leave review
            </button>
          </form>
        </div>

        {/* Список отзывов */}
        {/* <div className="reviews max-w-52"> */}
        <h3 className="text-xl font-bold mb-2 ml-11">Reviews</h3>
        <div className="review-holder max-w-sm">
          {reviews.map((review, index) => (
            <div key={index} className="border-b py-2 ml-5">
              <div className="rw flex gap-3">
                <p className="font-bold">{review.name}</p>
                <p className="text-yellow-500">{review.rating} ★</p>
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
