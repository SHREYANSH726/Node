import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // custom CSS

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", size: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/pizzas").then((res) => {
      setPizzas(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/pizzas", form).then(() => {
      alert("Pizza Added!");
      window.location.reload();
    });
  };

  return (
    <div className="container">
      <h1>🍕 Pizza Menu</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Pizza Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Price"
          type="number"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <select
          onChange={(e) => setForm({ ...form, size: e.target.value })}
          required
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <button type="submit">Add Pizza</button>
      </form>

      <ul className="pizza-list">
        {pizzas.map((pizza, index) => (
          <li key={index}>
            <span>{pizza.name}</span>
            <span>₹{pizza.price}</span>
            <span>{pizza.size}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
