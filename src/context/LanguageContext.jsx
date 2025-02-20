/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from "react"; // Asegúrate de importar React
import PropTypes from "prop-types"; // Importa PropTypes si lo necesitas

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Validación de prop para children
LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validar que children es un nodo de React
};

export const useLanguage = () => useContext(LanguageContext);
