/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CardWidget from "./CardWidget";
import logo from "../assets/logochico.png"; // Ajusta la ruta según la ubicación del archivo
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Iconos para el menú hamburguesa

const NavBar = ({ nombre, botonLabel, paises }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  // Estado para manejar el menú hamburguesa
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false); // Cierra el menú
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      {/* Botón de hamburguesa visible en dispositivos pequeños */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? (
          <FaTimes size={30} color="white" />
        ) : (
          <FaBars size={30} color="white" />
        )}
      </div>

      {/* Menú principal, visible cuando 'menuOpen' es true en pantallas pequeñas */}
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="menu-item" onClick={closeMenu}>
          <Button label="Inicio" color="white" bg="transparent" />
        </Link>

        <Link to="/paquetes/todos" className="menu-item" onClick={closeMenu}>
          <Button
            color="white"
            bg="transparent"
            label={botonLabel}
            onClick={() => console.log("Navegando a Paquetes")}
          />
        </Link>

        {paises.map((pais, index) => (
          <Button
            color="white"
            bg="transparent"
            key={index}
            label={pais}
            onClick={() => {
              navigate(`paquetes/${pais}`);
              closeMenu(); // Cierra el menú al elegir una opción
            }}
            className="menu-item"
          />
        ))}
      </div>

      <div className="cart-icon">
        <CardWidget />
      </div>
    </nav>
  );
};

export default NavBar;
