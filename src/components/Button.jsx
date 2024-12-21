/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";


const Button = ({ label, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: "black",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};



export default Button;
