
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import { Link } from "react-router-dom";
import Button from "./Button";
import { useCart } from "../context/CartContext"; // Importa el componente Button

const ItemList = ({ paquetes }) => {
  const { agregarAlCarrito } = useCart();

  // Función para obtener el precio disponible
  const obtenerPrecioValido = (paquete) => {
    // Acceder a los precios de las distintas opciones de paquetes
    const precios = [
      paquete.salidas?.salida?.doble_precio,
      paquete.salidas?.salida?.triple_precio,
      paquete.salidas?.salida?.familia_1_precio,
    ];

    // Filtrar precios válidos (solo los números positivos)
    const preciosValidos = precios
      .filter((precio) => !isNaN(precio) && parseFloat(precio) > 0)
      .map((precio) => parseFloat(precio));

    // Si hay precios válidos, devolver el primero formateado
    if (preciosValidos.length > 0) {
      return preciosValidos[0].toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
    }

    return "No disponible"; // Si no hay precios válidos
  };

  return (
    <div className="row">
      {paquetes.map((paquete) => {
        const precioFormateado = obtenerPrecioValido(paquete);

        return (
          <div
            key={paquete.paquete_externo_id}
            className="col-lg-3 col-md-4 col-sm-6"
          >
            <div className="card">
              <img
                src={paquete.imagen_principal}
                alt={paquete.titulo}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{paquete.titulo}</h5>
                <p className="card-text">{paquete.descripcion}</p>

                {/* Mostrar precio formateado */}
                <p>Precio: {precioFormateado}</p>

                <div className="m-3">
                  <Link to={`/detalle/${paquete.paquete_externo_id}`}>
                    <Button label="Ver más" onClick={() => {}} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ItemList.propTypes = {
  paquetes: PropTypes.array.isRequired, // Asegúrate de que el array de paquetes sea requerido
};

export default ItemList;
