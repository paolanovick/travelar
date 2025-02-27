/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";

const Checkout = () => {
  const { cart, setCart, setPurchaseDetails, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
  });
  const [total, setTotal] = useState(0);
  const location = useLocation();
   const navigate = useNavigate();

  // Función para obtener el total de la compra desde la URL
  useEffect(() => {
    
    const queryParams = new URLSearchParams(location.search);
    const totalFromUrl = queryParams.get("total");
    if (totalFromUrl) {
      setTotal(parseFloat(totalFromUrl.replace(/,/g, ""))); // Establecer el total extraído de la URL
    }
  }, [location]);
  
  
const formatTotal = (value) => {
  const valorNumerico = parseFloat(value);
  if (isNaN(valorNumerico)) {
    return "Total no disponible"; // Maneja el caso de valor no válido
  }

  return valorNumerico.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log("Formulario enviado");

    // Guardar los detalles de la compra en el contexto
    const purchaseDetails = {
      customer: formData,
      items: cart,
      total: total, // Total extraído de la URL
    };

    setPurchaseDetails(purchaseDetails); // Guardar detalles de compra en el contexto
    clearCart(); // Esto vacía el carrito
    navigate("/confirmacion"); // Redirigir a la página de confirmación
  };

  return (
    <div className="checkout-container">
      <h2 className='text-dark'>Finalizar Compra</h2>
      <div className="checkout-summary">
        <h3>Resumen de tu pedido</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={item.id ? item.id : index}>
              {item.name} - Cantidad: {item.quantity || 1}
            </li>
          ))}
        </ul>
        <p>Total: {formatTotal(total)}</p>
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
        <Button label="Finalizar Compra" />
      </form>
    </div>
  );
};

export default Checkout;
