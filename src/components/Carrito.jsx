/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Carrito = ({ valor }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      🛒 <span style={{ marginLeft: "5px", color: "#007BFF" }}>{valor}</span>
    </div>
  );
};

export default Carrito;
