import './App.css';
import React from 'react';
import Header from '../src/components/layout/Header';
import HeroBanner from '../src/components/HeroBanner';
import ProductList from '../src/components/product/ProductList';
import Footer from '../src/components/layout/Footer';

const mockProducts = [
    { id: 1, name: 'Spiced Melt', price: 9.99, image: '/assets/images/spiced-melt.jpg' },
    { id: 2, name: 'Sweet Strawberry', price: 9.99, image: '/assets/images/sweet-strawberry.jpg' },
    // Add more products
];

function App() {
    return (
        <div className="App">
            <Header/>
            <HeroBanner/>
            <section className="p-8">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <ProductList products={mockProducts}/>
            </section>
            <Footer/>
        </div>
    );
}

export default App;
