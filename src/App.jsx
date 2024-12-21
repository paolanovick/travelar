/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemList from "./components/ItemList";
import { XMLParser } from "fast-xml-parser"; // Importa el parser XML
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { CartProvider, useCart } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [paquetes, setPaquetes] = useState([]); // Todos los paquetes
  const [paquetesFiltrados, setPaquetesFiltrados] = useState([]); // Paquetes filtrados por país
  const [error, setError] = useState(null);

  const [paises, setPaises] = useState([]); // Lista de países
  const [paisSeleccionado, setPaisSeleccionado] = useState("");

  useEffect(() => {
    fetch(`/admin/xml/allseasons.xml`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo XML.");
        }
        return response.text();
      })
      .then((data) => {
        const parser = new XMLParser();
        const jsonData = parser.parse(data);
        if (jsonData?.root?.paquetes?.paquete) {
          const paquetesData = jsonData.root.paquetes.paquete;
          const paquetesLimitados = paquetesData.slice(0, 50);
          setPaquetes(paquetesData);
          setPaquetesFiltrados(paquetesLimitados);
          const paisesUnicos = [
            ...new Set(
              paquetesData.flatMap(
                (paquete) => paquete?.destinos?.destino?.pais || []
              )
            ),
          ];
          setPaises(paisesUnicos);
        } else {
          console.error("Estructura de datos inesperada:", jsonData);
          setError("No se encontraron paquetes.");
        }
      })
      .catch((error) => {
        setError(`Error al obtener los paquetes: ${error.message}`);
        console.error("Error al obtener los paquetes:", error);
      });
  }, []);

  // Función para manejar el cambio de país seleccionado
  const handlePaisSeleccionado = (pais) => {
    setPaisSeleccionado(pais);
    if (pais === "") {
      setPaquetesFiltrados(paquetes); // Muestra todos los paquetes si no hay filtro
    } else {
      const paquetesFiltradosPorPais = paquetes.filter(
        (paquete) =>
          paquete?.destinos?.destino?.pais?.toLowerCase() === pais.toLowerCase()
      );
      setPaquetesFiltrados(paquetesFiltradosPorPais);
    }
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <NavBar
            nombre="TravelAr"
            botonLabel="Ver Paquetes"
            paises={paises}
            onPaisSeleccionado={handlePaisSeleccionado}
          />
          <Routes>
            <Route
              path="/"
              element={<ItemListContainer paquetes={paquetesFiltrados} />}
            />
            <Route
              path="/paquetes"
              element={
                <ItemList
                  paquetes={paquetesFiltrados}
                  // Llamamos a la función que viene del contexto
                />
              }
            />
            <Route
              path="/detalle/:idProducto"
              element={<ItemDetailContainer />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;