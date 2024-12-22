/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ItemListContainer = ({ items }) => {
  if (!items) {
    return <p>Cargando...</p>;
  }

  if (items.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemListContainer;
