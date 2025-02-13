/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ItemCount from "../components/ItemCount"; // Importa tu componente de botón personalizado

// Función exportada fuera del componente Cart.jsx
export const obtenerPrecioValido = (paquete) => {
  console.log("el paquete es :", paquete);
  const precio = paquete.detalleProducto.salidas.salida.doble_precio;
  return precio * paquete.quantity;
};

const Cart = () => {
  const { cart, setCart, addToCart, decrementFromCart } = useCart();
  console.log("Cart es  :", cart);
  const navigate = useNavigate();
  const [totalBeforeClear, setTotalBeforeClear] = useState(0);

  const handleRemoveFromCart = (paquete_externo_id) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.detalleProducto.paquete_externo_id !== paquete_externo_id
      )
    );
  };

  const handleCheckout = () => {
    console.log("Iniciando el proceso de compra...");
    const total = calcularTotal();
    console.log("el total es : ", total); // Calcula el total
    const formattedTotal = new Intl.NumberFormat().format(total);
    console.log("Total antes de vaciar el carrito:", formattedTotal);
    setTotalBeforeClear(total);
    setCart([]); // Limpiar el carrito
    console.log("Carrito después de vaciar:", cart);

    navigate(`/checkout?total=${total}`);
  };

  const calcularTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.detalleProducto.salidas.salida.doble_precio * item.quantity;
    });
    return total;
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
                key={item.detalleProducto.paquete_externo_id}
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
                    src={item.detalleProducto.imagen_principal}
                    alt={item.detalleProducto.titulo}
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
                      {item.detalleProducto.titulo}
                    </h3>
                    <p style={{ margin: "5px 0", color: "#777" }}>
                      {item.detalleProducto.descripcion}
                    </p>
                    <p style={{ margin: "5px 0", color: "#777" }}>
                      vigencia: {item.detalleProducto.fecha_vigencia_desde} {}
                      hasta: {item.detalleProducto.fecha_vigencia_hasta}
                    </p>
                    <ItemCount
                      stock={item.quantity}
                      item={item}
                      onAdd={addToCart}
                      decrement={decrementFromCart}
                    />
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
                      handleRemoveFromCart(
                        item.detalleProducto.paquete_externo_id
                      )
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
          Total:{" "}
          {calcularTotal().toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </p>
        <Button label="Finalizar Compra" onClick={handleCheckout} />
      </div>
    </div>
  );
};

export default Cart;
