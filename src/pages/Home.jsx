import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import HeroBanner from '../components/HeroBanner';
import ProductList from '../components/product/ProductList';
import Footer from '../components/layout/Footer';
import mockProducts from '../data/mockProducts'

const Home = () => {
    return (
        <>
            <Header />
            <HeroBanner />
            <section className="p-8">
                <h2 className="flex text-2xl font-bold mb-4 justify-center">new Collection</h2>
                <h2 className="flex text-lg mb-4 justify-center ">Summer 2024</h2>

                <ProductList products={mockProducts} />
            </section>
            <Footer />
        </>
    );
};

export default Home;
