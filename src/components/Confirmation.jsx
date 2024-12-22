/* eslint-disable no-unused-vars */
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const { purchaseDetails } = useCart();
  const navigate = useNavigate();

  if (!purchaseDetails) {
    return <div>No se encontró la información de la compra.</div>;
  }

  return (
    <div className="confirmation-container">
      <h2>Compra Finalizada</h2>
      <div className="confirmation-summary">
        <h3>Resumen de tu pedido</h3>
        <ul>
          {purchaseDetails.items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <p>Total: ${purchaseDetails.total}</p>
        <h3>Detalles del Cliente</h3>
        <p>Nombre: {purchaseDetails.customer.name}</p>
        <p>Correo: {purchaseDetails.customer.email}</p>
        <p>Dirección: {purchaseDetails.customer.address}</p>
        <p>Método de Pago: {purchaseDetails.customer.paymentMethod}</p>
      </div>
      <button onClick={() => navigate("/")}>Volver a la tienda</button>
    </div>
  );
};

export default Confirmation;
