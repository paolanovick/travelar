/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

// Crear el contexto del carrito
const CartContext = createContext();

// Hook para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado del carrito
  const [purchaseDetails, setPurchaseDetails] = useState(null); // Detalles de la compra

  const decrementFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  // Agregar producto al carrito
  const addToCart = (item) => {
    let to_add = false;

    // Crear una nueva copia del carrito y modificarla
    const updatedCart = cart.map((element) => {
      if (
        element.detalleProducto.paquete_externo_id ===
        item.detalleProducto.paquete_externo_id
      ) {
        // Incrementar la cantidad correctamente sin mutar el estado
        to_add = true;
        return { ...element, quantity: element.quantity + 1 };
      }
      return element; // Retornar los elementos que no fueron modificados
    });

    // Si no se encontró el producto, agregarlo al carrito
    if (!to_add) {
      setCart([...updatedCart, { ...item, quantity: 1 }]);
    } else {
      setCart(updatedCart); // Actualizar el carrito solo si hubo cambios
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Contador de productos en el carrito
  const itemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart, // Permite modificar el carrito manualmente
        addToCart,
        decrementFromCart,
        removeFromCart,
        clearCart,
        itemCount,
        purchaseDetails,
        setPurchaseDetails, // Permite guardar detalles de la compra
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
