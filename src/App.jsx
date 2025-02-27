/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css"; // Asegúrate de que la ruta sea correcta
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
import CardWidget from "./components/CardWidget";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageProvider } from "./context/LanguageContext";
import Carousel from "./components/Carousel";
import Inicio from "./components/Inicio";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBo89OyesZwSRBkx-FERQhErX8zVe4uTUQ",
  authDomain: "travelfar-3f8d9.firebaseapp.com",
  projectId: "travelfar-3f8d9",
  storageBucket: "travelfar-3f8d9.firebasestorage.app",
  messagingSenderId: "878666935919",
  appId: "1:878666935919:web:eb62ed6e0cc26a5418679a",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (opcional)
const db = getFirestore(app);

const App = () => {
  const [paquetes, setPaquetes] = useState([]); // Todos los paquetes
  // const [paquetesFiltrados, setPaquetesFiltrados] = useState([]); // Paquetes filtrados por país
  const [error, setError] = useState(null);
  const [paises, setPaises] = useState([]); // Lista de países
  // const [paisSeleccionado, setPaisSeleccionado] = useState("");

  const obtenerPaises = paquetes => {
    const soloPaises = paquetes.map(paquete => paquete.destinos.destino.pais)
    const sinUndefined = soloPaises.filter(pais => pais !== undefined)
    const paisesSinDuplicados = [...new Set(sinUndefined)]

    return paisesSinDuplicados
  }

  useEffect(() => {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then(xmlText => {
        const parser = new XMLParser()
        const xmlDoc = parser.parse(xmlText)
        const todosLosPaquetes = xmlDoc.root.paquetes.paquete
        const nombresPaises = obtenerPaises(todosLosPaquetes)

        setPaises(nombresPaises)
        setPaquetes(todosLosPaquetes)
      })
      .catch(error => {
        console.error(`There was a problem with the fetch operation:`, error)
      })
  }, [])

  // useEffect(() => {
  //   fetch()
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("No se pudo cargar el archivo XML.");
  //       }
  //       return response.text();
  //     })
  //     .then((data) => {
  //       const parser = new XMLParser();
  //       const jsonData = parser.parse(data);

  //       if (jsonData?.root?.paquetes?.paquete) {
  //         const paquetesData = jsonData.root.paquetes.paquete;
  //         const paquetesLimitados = paquetesData.slice(0, 50); // Limitar a 50 paquetes
  //         setPaquetes(paquetesData);
  //         setPaquetesFiltrados(paquetesLimitados);

  //         // Filtrar países únicos
  //         const paisesUnicos = [
  //           ...new Set(
  //             paquetesData.flatMap(
  //               (paquete) => paquete?.destinos?.destino?.pais || []
  //             )
  //           ),
  //         ];
  //         setPaises(paisesUnicos);
  //       } else {
  //         console.error("Estructura de datos inesperada:", jsonData);
  //         setError("No se encontraron paquetes.");
  //       }
  //     })
  //     .catch((error) => {
  //       setError(`Error al obtener los paquetes: ${error.message}`);
  //       console.error("Error al obtener los paquetes:", error);
  //     });
  // }, []); // Este useEffect solo se ejecuta una vez al montar el componente

  // // Filtrar paquetes por país cuando el país seleccionado cambie
  // useEffect(() => {
  //   if (paisSeleccionado === "") {
  //     setPaquetesFiltrados(paquetes); // Muestra todos los paquetes si no hay filtro
  //   } else {
  //     const paquetesFiltradosPorPais = paquetes.filter((paquete) => {
  //       const destinos = paquete?.destinos?.destino;
  //       // Verificar si destinos es un arreglo antes de usar .some()
  //       if (Array.isArray(destinos)) {
  //         return destinos.some(
  //           (destino) =>
  //             destino.pais?.toLowerCase() === paisSeleccionado.toLowerCase()
  //         );
  //       }
  //       return false;
  //     });

  //     setPaquetesFiltrados(paquetesFiltradosPorPais);
  //   }
  // }, [paisSeleccionado, paquetes]); // Dependencias: se ejecuta cuando cambian paisSeleccionado o paquetes

  // Función para manejar el cambio de país seleccionado
  // const handlePaisSeleccionado = (pais) => {
  //   setPaisSeleccionado(pais);
  // };

  return (
    <LanguageProvider>
      <CartProvider>
        <BrowserRouter>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              margin: "0 auto",
              backgroundColor: "black", // Fondo de la página negro
              color: "white", // Texto blanco en la página
            }}
          >
            <NavBar
              nombre="TravelAr"
              botonLabel="Ver Paquetes"
              paises={paises}
            />
            <Routes>
              <Route path="/" element={<Inicio />} />{" "}
              <Route
                path="/paquetes/:pais"
                element={<ItemList listaPaquetes={paquetes} />}
              />
              <Route
                path="/detalle/:idProducto"
                element={<ItemDetailContainer paquetes={paquetes} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmacion" element={<Confirmation />} />
            </Routes>

            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;
