/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import { Link } from "react-router-dom";
import Button from "./Button"; // Importa el componente Button
const ItemList = ({ paquetes}) => {
  return (
    <div className="row">
      {paquetes.map((paquete) => (
        <div key={paquete.paquete_externo_id} className="col-md-4">
          <div className="card">
            <img
              src={paquete.imagen_principal}
              alt={paquete.titulo}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{paquete.titulo}</h5>
              <p className="card-text">{paquete.descripcion}</p>
              <p className="card-text">
                <strong>Precio:</strong> ${paquete.doble_precio}
              </p>
              <div className="m-3">
                {/* Reemplaza el botón "Ver más" con el componente Button */}
                <Link to={`/detalle/${paquete.paquete_externo_id}`}>
                  <Button label="Ver más" onClick={() => {}} />{" "}
                  {/* El onClick puede ser opcional si solo navegas */}
                </Link>{" "}
              
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
