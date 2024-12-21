/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ItemList from "./ItemList"; // Importamos el componente ItemList
import { XMLParser } from "fast-xml-parser"; // Importamos fast-xml-parser

const ItemListContainer = () => {
  const [paquetes, setPaquetes] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    fetch(`/admin/xml/allseasons.xml`)
      .then((response) => response.text()) // Obtenemos el XML como texto
      .then((xml) => {
        try {
          const parser = new XMLParser(); // Creamos el parser
          const jsonData = parser.parse(xml); // Parseamos el XML a JSON

          // Verifica la estructura del JSON recibido
          console.log("Datos recibidos:", jsonData);

          // Ajusta esta línea según la estructura de tu XML
          if (jsonData && jsonData.hoteles && jsonData.hoteles.hotel) {
            setPaquetes(jsonData.hoteles.hotel); // Guardamos los datos
          } else {
            console.error("Estructura de datos inesperada:", jsonData);
          }
        } catch (error) {
          console.error("Error al analizar el XML:", error);
        }
        setLoading(false); // Actualizamos el estado de carga
      })
      .catch((error) => {
        console.error("Error al obtener los paquetes:", error);
        setLoading(false); // En caso de error, dejamos de cargar
      });
  }, []); // Solo se ejecuta una vez después del primer renderizado

  return (
    <div>
      <h1>Paquetes de Viaje</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ItemList paquetes={paquetes} /> // Pasamos los paquetes al componente ItemList
      )}
    </div>
  );
};

export default ItemListContainer;
