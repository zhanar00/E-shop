import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} />
            ))}
        </div>
    );
};


export default ProductList;
