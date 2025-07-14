import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import AddProduct from './AddProduct';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:1212/product');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1212/product/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleAdd = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <AddProduct onProductAdded={handleAdd} />
      <h2 className="my-4">Product List</h2>
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
