import React from "react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative bg-gray-200 text-white py-16 px-8 mt-20">
      <div className="flex flex-col  text-left mb-6">
        <Link to="/" className="text-gray-600 hover:text-white">
          MAN
        </Link>
        <Link to="/" className="text-gray-600 hover:text-white">
          WOMAN
        </Link>
        <Link to="/" className="text-gray-600 hover:text-white">
          KIDS
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-sm py-2 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-greenPrimary"
        />
      </div>
      
    </div>
  );
};

export default HeroBanner;
