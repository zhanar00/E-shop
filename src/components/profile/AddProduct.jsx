import React, { useState } from "react";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        material: "",
        colors: [],
        sizes: [],
        quantity: 0,
        images: [],
    });

    const [colorInput, setColorInput] = useState("");
    const [sizeInput, setSizeInput] = useState("");

    // Обработчик изменения полей
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Добавление цвета
    const handleAddColor = () => {
        if (colorInput) {
            setProduct((prev) => ({
                ...prev,
                colors: [...prev.colors, colorInput],
            }));
            setColorInput("");
        }
    };

    // Добавление размера
    const handleAddSize = () => {
        if (sizeInput) {
            setProduct((prev) => ({
                ...prev,
                sizes: [...prev.sizes, sizeInput],
            }));
            setSizeInput("");
        }
    };

    // Обработка загрузки изображения
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Data:", product);
        alert("Product added successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block font-medium mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter product description"
                        rows="3"
                    ></textarea>
                </div>

                {/* Price */}
                <div>
                    <label className="block font-medium mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter product price"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter product category"
                    />
                </div>

                {/* Brand and Material */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={product.brand}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter brand name"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Material</label>
                        <input
                            type="text"
                            name="material"
                            value={product.material}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter material"
                        />
                    </div>
                </div>

                {/* Colors */}
                <div>
                    <label className="block font-medium mb-1">Colors</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            className="flex-1 p-2 border rounded"
                            placeholder="Add color (e.g., #FFF)"
                        />
                        <button
                            type="button"
                            onClick={handleAddColor}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {product.colors.map((color, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-200 rounded text-sm"
                            >
                {color}
              </span>
                        ))}
                    </div>
                </div>

                {/* Sizes */}
                <div>
                    <label className="block font-medium mb-1">Sizes</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={sizeInput}
                            onChange={(e) => setSizeInput(e.target.value)}
                            className="flex-1 p-2 border rounded"
                            placeholder="Add size (e.g., S, M, L)"
                        />
                        <button
                            type="button"
                            onClick={handleAddSize}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {product.sizes.map((size, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-200 rounded text-sm"
                            >
                {size}
              </span>
                        ))}
                    </div>
                </div>

                {/* Quantity */}
                <div>
                    <label className="block font-medium mb-1">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter quantity"
                        min="0"
                    />
                </div>

                {/* Images */}
                <div>
                    <label className="block font-medium mb-1">Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full p-2 border rounded"
                    />
                    <p className="text-gray-500 text-sm mt-1">Upload product images</p>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
