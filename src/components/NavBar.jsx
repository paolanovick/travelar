
/* eslint-disable no-undef */
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
import { Menu, X } from "lucide-react";

const NavBar = ({ nombre, botonLabel, paises }) => {
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
              width: "80%",
              height: "auto",
             
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
         {/* Botón de menú hamburguesa (visible solo en móvil) */}
      <div
        style={{
          display: "none",
          cursor: "pointer",
        }}
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={30} color="white" /> : <Menu size={30} color="white" />}
      </div>

      {/* Menú de navegación */}
      <div
        style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          position: "absolute",
          top: "60px",
          left: 0,
          width: "100%",
          backgroundColor: "black",
          padding: "10px 0",
          textAlign: "center",
        }}
        className="nav-links"
      ></div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button 
            label="Inicio" 
            color='white'
            bg='transparent' 
          />
        </Link>

        <Link to="/paquetes/todos" style={{ textDecoration: "none" }}>
          <Button
            color='white'
            bg='transparent'
            label={botonLabel}
            onClick={() => console.log("Navegando a Paquetes")}
          />
        </Link>

        {paises.map((pais, index) => (
          <Button
            color='white'
            bg='transparent'
            key={index}
            label={pais}
            onClick={() => {
              navigate(`paquetes/${pais}`);
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <CardWidget />
      </div>
    </nav>
  );
};

export default NavBar;
