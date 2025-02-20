/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      style={{
        color: "white", // Texto blanco
        border: "none", // Sin borde
        backgroundColor: "transparent", // Fondo transparente
        padding: "10px 20px", // Espaciado
        cursor: "pointer", // Cursor tipo mano
        fontSize: "16px", // Fuente más grande
        transition: "all 0.3s ease", // Transición suave
      }}
      onMouseOver={(e) => {
        e.target.style.color = "#f39c12"; // Color de texto al pasar el mouse
      }}
      onMouseOut={(e) => {
        e.target.style.color = "white"; // Vuelve al color original
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
