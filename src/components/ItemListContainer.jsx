/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ItemListContainer = ({ items }) => {
  return (
    <div>
      <h2>Lista de Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemListContainer;
