/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import Carrito from "./Carrito";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CardWidget from "./CardWidget";
import logo from "../assets/logochico.png"; // Ajusta la ruta según la ubicación del archivo

import { useNavigate } from "react-router-dom";

const NavBar = ({ nombre, botonLabel, paises, onPaisSeleccionado }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap", // Permite que los elementos se ajusten en varias líneas
        padding: "10px 20px",
        backgroundColor: "black", // Fondo de la barra
        boxShadow: "0px 4px 6px rgba(19, 18, 18, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "auto",
              height: "auto",
              maxHeight: "50px",
              maxWidth: "100px",
            }}
          />
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap", // Asegura que los botones se ajusten en pantallas pequeñas
          gap: "15px",
          justifyContent: "center", // Espaciado uniforme
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button label="Inicio" />
        </Link>

        <Link to="/paquetes" style={{ textDecoration: "none" }}>
          <Button
            label={botonLabel}
            onClick={() => console.log("Navegando a Paquetes")}
          />
        </Link>

        {paises.map((pais, index) => (
          <Button
            key={index}
            label={pais}
            onClick={() => {
              onPaisSeleccionado(pais);
              navigate("/paquetes");
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/cart" style={{ textDecoration: "none", marginLeft: "20px" }}>
          <CardWidget />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
