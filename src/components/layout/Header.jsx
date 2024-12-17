import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Header = () => {
    // const cartItemsCount = useSelector((state) => state.cart?.items?.length || 0);
    const user = useSelector((state) => state.auth.user); // Access auth state

    const cartItemsCount = useSelector((state) => {
        console.log('Состояние корзины:', state.cart);
        return state.cart?.items?.length || 0;
    });

    return (
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <div className="text-2xl font-bold text-greenPrimary">Shop</div>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-greenPrimary"
                />
                <Link to="/" className="text-gray-600 hover:text-greenPrimary">
                    Discover
                </Link>
                <Link
                    to="/cart" // Путь должен быть на латинице
                    className="relative text-gray-600 hover:text-greenPrimary"
                >
                    <span>Cart</span>
                    {cartItemsCount > 0 && (
                        <span
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartItemsCount}
            </span>
                    )}
                </Link>

                {user ? <Link to="/profile" className="text-gray-600 hover:text-greenPrimary">
                        Profile
                    </Link> :
                    <Link to="/login" className="text-gray-600 hover:text-greenPrimary">
                        Login
                    </Link>
                }

            </div>
        </header>
    );
};

export default Header;