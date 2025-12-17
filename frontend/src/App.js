import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.phone || !formData.password) {
      setMessage("All fields are required!");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const response = await fetch("http://localhost:2000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("Registration Successful!");
      setMessageType("success");
      setFormData({ username: "", email: "", phone: "", password: "" });
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error: " + data.message);
      setMessageType("error");
    }
  };

  return (
    <div className="container">

      <form className="form" onSubmit={handleSubmit} noValidate>
        <h2 className="heading">User Registration</h2>
        {message && (
          <p className={`msg ${messageType}`}>
            {message}
          </p>
        )}
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter Username"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter Phone Number"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />

        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default App;