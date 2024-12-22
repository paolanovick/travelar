
/* eslint-disable no-unused-vars */
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; // Importa tu componente de botón personalizado

const Cart = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  // Función para eliminar un artículo del carrito
  const handleRemoveFromCart = (paquete_externo_id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.paquete_externo_id !== paquete_externo_id)
    );
  };

  // Función para vaciar el carrito
  const handleClearCart = () => {
    setCart([]);
  };

  // Función para finalizar la compra
 const handleCheckout = () => {
   console.log("Finalizando compra...");
   handleClearCart();
   navigate("/checkout");
 };


  // Función para obtener el primer precio válido de un artículo
  const obtenerPrecioValido = (item) => {
    const precios = [
      item?.salidas?.salida?.doble_precio,
      item?.salidas?.salida?.triple_precio,
      item?.salidas?.salida?.familia_1_precio,
    ];

    const preciosValidos = precios
      .filter((precio) => !isNaN(precio) && parseFloat(precio) > 0)
      .map((precio) => parseFloat(precio));

    return preciosValidos.length > 0 ? preciosValidos[0] : 0;
  };

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return cart
      .reduce((total, item) => total + obtenerPrecioValido(item), 0)
      .toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
  };

  return (
    <div
      className="cart"
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        gap: "20px",
      }}
    >
      <div style={{ flex: 2 }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Carrito de Compras
        </h2>
        {cart.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
            El carrito está vacío.
          </p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.paquete_externo_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  marginBottom: "15px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                  <img
                    src={item.imagen_principal}
                    alt={item.titulo}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                      marginRight: "20px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>
                      {item.titulo}
                    </h3>
                    <p style={{ margin: "5px 0", color: "#777" }}>
                      {item.descripcion}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "right", flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {obtenerPrecioValido(item).toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </p>
                  <Button
                    label="Eliminar"
                    onClick={() =>
                      handleRemoveFromCart(item.paquete_externo_id)
                    }
                    style={{
                      backgroundColor: "#ff3b30",
                      color: "#fff",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginTop: "10px",
                      transition: "background-color 0.3s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumen del pedido */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          height: "fit-content",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Resumen del Pedido</h3>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Total: {calcularTotal()}
        </p>
        <Button label="Finalizar Compra" onClick={handleCheckout} />
      </div>
    </div>
  );
};

export default Cart;
