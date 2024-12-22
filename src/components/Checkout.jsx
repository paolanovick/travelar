/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, setPurchase } = useCart(); // Desestructuramos 'setPurchase' de useCart
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");

    // Guardar los detalles de la compra en el contexto
    const purchaseDetails = {
      customer: formData,
      items: cart,
      total: totalPrice(),
    };

    setPurchase(purchaseDetails); // Guardar los detalles de la compra
    navigate("/confirmacion");
  };


  if (cart.length === 0) {
    return <div>No hay productos en el carrito.</div>;
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      <div className="checkout-summary">
        <h3>Resumen de tu pedido</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <p>Total: ${totalPrice()}</p> {/* Aquí se muestra el total calculado */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección de Envío</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Método de Pago</label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona un método</option>
            <option value="creditCard">Tarjeta de Crédito</option>
            <option value="paypal">PayPal</option>
            <option value="transfer">Transferencia Bancaria</option>
          </select>
        </div>
        <button type="submit">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default Checkout;
