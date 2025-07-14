import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ProductList from './component/ProductList';
import AddProduct from './component/AddProduct';
import './App.css';

const App = () => {
  const [value, setValue] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:1212/product')
      .then((res) => setValue(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <nav className="navbar bg-dark text-white px-4">
        <h2>🛍️ My Product Dashboard</h2>
      </nav>

      <div className="main-layout">
        {/* Main section only shows product list */}
        <main className="content">
          <ProductList products={value} fetchData={fetchData} />
        </main>
      </div>
    </>
  );
};

export default App;
