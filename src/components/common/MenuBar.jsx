import React, { useState } from "react";

const MenuBar = () => {
  // Состояния для управления классами
  const [burgerClass, setBurgerClass] = useState("unclicked");
  const [menuClass, setMenuClass] = useState("hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // Обновление состояния кнопки и меню
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("clicked");
      setMenuClass("block");
    } else {
      setBurgerClass("unclicked");
      setMenuClass("hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div className="w-full relative">
      {/* Кнопка-бургер */}
      <div
        className="h-12 gap-2 w-12 flex flex-col items-start justify-center cursor-pointer"
        onClick={updateMenu}
      >
        <div
          className={`w-full h-1 bg-greenPrimary rounded-lg transition-transform duration-300 ease-in-out ${
            burgerClass === "clicked"
              ? "rotate-45 translate-y-3"
              : "rotate-0 translate-y-0"
          }`}
        ></div>
        <div
          className={`w-full h-1 bg-greenPrimary rounded-lg transition-opacity duration-300 ease-in-out ${
            burgerClass === "clicked" ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        <div
          className={`w-full h-1 bg-greenPrimary rounded-lg transition-transform duration-300 ease-in-out ${
            burgerClass === "clicked"
              ? "-rotate-45 -translate-y-3"
              : "rotate-0 translate-y-0"
          }`}
        ></div>
      </div>

      {/* Меню */}
      <div
        className={`w-[300px] h-full bg-white fixed top-20 left-0 z-10 overflow-y-auto transition-transform duration-300 ease-in-out ${
          menuClass === "block" ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Содержимое меню */}
        <div className="p-4">
          <ul className="text-lg font-semibold">
            <li className="py-2">Outerwear</li>
            <li className="py-2">Trousers and jeans</li>
            <li className="py-2">Dresses and skirts</li>
            <li className="py-2">Tops and t-shirts</li>
            <li className="py-2">Sweaters and cardigans</li>
            <li className="py-2">Sportswear</li>
            <li className="py-2">Shirts and t-shirts</li>
            <li className="py-2">Sweaters and hoodies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
