/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";

const Footer = ({ nombre, botonLabel }) => {
  return (
    <footer style={styles.footer}>
      {/* Nombre en el Footer */}
      <div style={styles.nombre}>{nombre}</div>

      {/* Botón de más información */}
      <Button
        label={botonLabel}
        onClick={() => console.log("Más info clickeado")}
      />
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  nombre: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#007BFF",
  },
};

export default Footer;
