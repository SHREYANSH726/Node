import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    rate: '',
    count: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      image: form.image,
      rating: {
        rate: parseFloat(form.rate),
        count: parseInt(form.count)
      }
    };

    try {
      const res = await axios.post('http://localhost:1212/product', newProduct);
      onProductAdded(res.data); // update state in parent
      setForm({
        title: '',
        price: '',
        description: '',
        image: '',
        rate: '',
        count: ''
      });
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control" placeholder="Title" required />
        <input type="text" name="price" value={form.price} onChange={handleChange} className="form-control" placeholder="Price" required />
        <input type="text" name="description" value={form.description} onChange={handleChange} className="form-control" placeholder="Description" required />
        <input type="text" name="image" value={form.image} onChange={handleChange} className="form-control" placeholder="Image URL" required />
        <input type="text" name="rate" value={form.rate} onChange={handleChange} className="form-control" placeholder="Rating (rate)" required />
        <input type="text" name="count" value={form.count} onChange={handleChange} className="form-control" placeholder="Rating (count)" required />
        <button className="btn btn-success" type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
