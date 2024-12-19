import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <Link to={`/product/${product.id}`} key={product.id}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded mb-4"
        />
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <HeartIcon className="w-6 h-6 mr-2" />
        </div>
        <p className="text-greenPrimary font-bold text-lg">${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
