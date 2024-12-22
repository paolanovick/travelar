/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado del carrito
  const [purchase, setPurchase] = useState(null); // Estado para almacenar los detalles de la compra

  const addToCart = (producto) => {
    setCart((prevCart) => [...prevCart, producto]);
  };

  const cartCount = cart.length; // Contador de productos en el carrito

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, cartCount, purchase, setPurchase }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
