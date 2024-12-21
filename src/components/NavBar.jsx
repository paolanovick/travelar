/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import Carrito from "./Carrito";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

const NavBar = ({ nombre, botonLabel, paises, onPaisSeleccionado }) => {
  const { cartCount } = useCart();
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        flexWrap: "wrap",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
        {nombre}
      </div>

      <Link to="/paquetes" style={{ textDecoration: "none" }}>
        <Button label={botonLabel} />
      </Link>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {paises.map((pais, index) => (
          <Button
            key={index}
            label={pais}
            onClick={() => onPaisSeleccionado(pais)}
          />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Aquí agregamos el componente Carrito */}
        <Carrito valor={cartCount} />
      </div>
    </nav>
    
  );
};
export default NavBar;
