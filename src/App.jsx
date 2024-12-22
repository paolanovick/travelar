/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./app.css"; // Asegúrate de que la ruta sea correcta
import Footer from "./components/Footer"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemList from "./components/ItemList";
import { XMLParser } from "fast-xml-parser"; // Importa el parser XML
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { CartProvider, useCart } from "./context/CartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
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
          const paquetesLimitados = paquetesData.slice(0, 50); // Limitar a 50 paquetes
          setPaquetes(paquetesData);
          setPaquetesFiltrados(paquetesLimitados);

          // Filtrar países únicos
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
  }, []); // Este useEffect solo se ejecuta una vez al montar el componente

  // Filtrar paquetes por país cuando el país seleccionado cambie
  useEffect(() => {
    if (paisSeleccionado === "") {
      setPaquetesFiltrados(paquetes); // Muestra todos los paquetes si no hay filtro
    } else {
      const paquetesFiltradosPorPais = paquetes.filter((paquete) => {
        const destinos = paquete?.destinos?.destino;
        // Verificar si destinos es un arreglo antes de usar .some()
        if (Array.isArray(destinos)) {
          return destinos.some(
            (destino) =>
              destino.pais?.toLowerCase() === paisSeleccionado.toLowerCase()
          );
        }
        return false;
      });
      
      setPaquetesFiltrados(paquetesFiltradosPorPais);
    }
  }, [paisSeleccionado, paquetes]); // Dependencias: se ejecuta cuando cambian paisSeleccionado o paquetes

  // Función para manejar el cambio de país seleccionado
  const handlePaisSeleccionado = (pais) => {
    setPaisSeleccionado(pais);
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
              element={<ItemList paquetes={paquetesFiltrados} />}
            />
            <Route
              path="/detalle/:idProducto"
              element={<ItemDetailContainer />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmacion" element={<Confirmation />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
