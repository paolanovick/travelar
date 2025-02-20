/* eslint-disable no-unused-vars */
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logochico.png";


// Usa el hook useLanguage en lugar de languageProvider
const Footer = () => {
  const { language, changeLanguage } = useLanguage();
  const handleClick = () => {
    changeLanguage("EN");
  };

  return (
    <footer style={styles.footer}>
      {/* Logo en el Footer */}
      <div style={styles.logoContainer}>
       
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", height: "auto" }}
          />
      
      </div>
      {/* Nombre en el Footer */}
      <div style={styles.nombre}>Huella Austral</div>

      {/* Textos típicos de un footer */}
      <div style={styles.textoFooter}>
        <p onClick={() => handleClick()}>
          {language === "es"
            ? "© 2025 Huella Austral. Todos los derechos reservados."
            : "© 2025 Huella Austral. All rights reserved."}
        </p>
        <p>
          <a href="/politica-privacidad" style={styles.enlace}>
            Política de privacidad
          </a>
          {" | "}
          <a href="/terminos-condiciones" style={styles.enlace}>
            Términos y condiciones
          </a>
        </p>
        <p>Contacto: contacto@huellaaustral.com</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#000000", // Fondo negro
    padding: "20px",
    textAlign: "center",
    boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
    bottom: 0,
    width: "100%",
    marginTop: "40px", // Agregado para añadir espacio entre el contenido y el footer
  },
  nombre: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#ffffff", // Texto blanco
  },
  textoFooter: {
    fontSize: "14px",
    color: "#ffffff", // Texto blanco
  },
  enlace: {
    color: "#ffffff", // Enlace blanco
    textDecoration: "none",
  },
};


export default Footer;
