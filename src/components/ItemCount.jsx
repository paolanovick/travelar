/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const ItemCount = ({ stock, onAdd, item, cart }) => {
  const [count, setCount] = useState(stock);

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(item);
  };

  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="item-count">
      <button onClick={handleDecrement}>-</button>
      <span>{count}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default ItemCount;
