import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import MenuBar from "../common/MenuBar";
import { HeartIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline"; // Импорт иконок

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const cartItemsCount = useSelector((state) => {
    console.log("Состояние корзины:", state.cart);
    return state.cart?.items?.length || 0;
  });

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 flex justify-between items-center z-50">
        <div className="flex items-start gap-11 items-center">
          <MenuBar />
          <Link
            to="/"
            className="relative text-gray-600 hover:text-greenPrimary"
          >
            Home
          </Link>
          <Link
            to="/collections"
            className="relative text-gray-600 hover:text-greenPrimary"
          >
            Collections
          </Link>
        </div>

        <div className="flex items-end gap-4 items-center">
          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-greenPrimary"
          >
            <HeartIcon className="w-6 h-6 mr-2" />
          </Link>
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-greenPrimary flex items-center"
          >
            <ShoppingCartIcon className="w-6 h-6 mr-2" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1 py-0 rounded-full">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/profile"
                className="text-gray-600 hover:text-greenPrimary flex items-center"
              >
                <UserIcon className="w-6 h-6 mr-2" />
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-greenPrimary flex items-center"
              >
                <UserIcon className="w-6 h-6 mr-2" />
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
