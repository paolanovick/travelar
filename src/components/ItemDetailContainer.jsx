/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { XMLParser } from "fast-xml-parser";
import { useCart } from "../context/CartContext";
// Importa tu componente Button personalizado
import Button from "../components/Button";

import { Container, Row, Col, Card, Image } from "react-bootstrap";

const ItemDetailContainer = () => {
  const [detalleProducto, setDetalleProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { idProducto } = useParams();
  const { addToCart } = useCart(); // Obtención del ID del producto de la URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/admin/xml/allseasons.xml`);
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo XML.");
        }
        const xml = await response.text();
        const parser = new XMLParser();
        const jsonData = parser.parse(xml); // Parseamos el XML a JSON

        const paquetes = jsonData?.root?.paquetes?.paquete;
        if (paquetes && paquetes.length > 0) {
          // Buscar el producto que coincida con el idProducto
          const producto = paquetes?.find((item) => {
            return String(item.paquete_externo_id) === String(idProducto);
          });

          if (producto) {
            setDetalleProducto(producto);
          } else {
            setError("Producto no encontrado.");
          }
        }
      } catch (err) {
        setError("Error al obtener los detalles del producto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idProducto]);

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

  const handleAddToCart = () => {
    let to_add = {
      detalleProducto,
      quantity: 1,
    };
    addToCart(to_add); // Añadir al carrito utilizando el método del contexto
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Extraemos los detalles del producto
  const {
    titulo,
    descripcion,
    imagen_principal,
    detalles_adicionales,
    destinos,
    fecha_vigencia_desde,
    fecha_vigencia_hasta,
    incluye,
    hoteles,
    galeria_imagenes,
    edad_menores,
    precios,
  } = detalleProducto || {};

  const renderPrecio = (paquete) => {
    // Llamamos a la función obtenerPrecioValido para obtener el precio
    const precioFormateado = obtenerPrecioValido(paquete);

    if (precioFormateado === "No disponible") {
      return (
        <p>
          <strong>Precio no disponible</strong>
        </p>
      );
    }

    return (
      <p>
        <strong>Precio:</strong> {precioFormateado}
      </p>
    );
  };

  return (
    <Container className="item-detail-container">
      <h1 className="titulo-detalle text-center my-4">
        Detalle del Producto {idProducto}
      </h1>

      <Row className="producto-card">
        <Col md={4} className="imagen-principal">
          <Image src={imagen_principal} alt={titulo} fluid rounded />
        </Col>

        <Col md={8} className="descripcion">
          <Card className="product-details">
            <Card.Body>
              <Card.Title>{titulo}</Card.Title>
              <Card.Text>{descripcion}</Card.Text>
              {detalleProducto && (
                <div className="precios">
                  {renderPrecio(detalleProducto)} {/* Muestra el precio aquí */}
                </div>
              )}
              <Button label="Agregar al carrito" onClick={handleAddToCart} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="detalles-paquete mt-4">
        <h2 className="text-center text-primary mb-4">
          ¡Descubre Tu Próximo Destino!
        </h2>

        {/* Destinos */}
        {destinos && destinos.destino && destinos.destino.length > 0 && (
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-lg border-0 rounded-3">
                <div
                  className="card-header text-white p-4"
                  style={{
                    backgroundImage:
                      "url('https://via.placeholder.com/600x200?text=Destinos')",
                  }}
                >
                  <h4 className="card-title text-center">Destinos</h4>
                </div>
                <div className="card-body">
                  {destinos.destino.map((destino, index) => (
                    <div key={index} className="mb-3">
                      <p>
                        <strong>País:</strong> {destino.pais}
                      </p>
                      <p>
                        <strong>Ciudad:</strong> {destino.ciudad}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Incluye */}
            {incluye && (
              <div className="col-md-4">
                <div className="card shadow-lg border-0 rounded-3">
                  <div
                    className="card-header text-white p-4"
                    style={{
                      backgroundImage:
                        "url('https://via.placeholder.com/600x200?text=Lo+que+Incluye')",
                    }}
                  >
                    <h4 className="card-title text-center">Incluye</h4>
                  </div>
                  <div className="card-body">
                    <div dangerouslySetInnerHTML={{ __html: incluye }} />
                  </div>
                </div>
              </div>
            )}

            {/* Hoteles */}
            {hoteles && hoteles.hotel && hoteles.hotel.length > 0 && (
              <div className="col-md-4">
                <div className="card shadow-lg border-0 rounded-3">
                  <div
                    className="card-header text-white p-4"
                    style={{
                      backgroundImage:
                        "url('https://via.placeholder.com/600x200?text=Hoteles')",
                    }}
                  >
                    <h4 className="card-title text-center">Hoteles</h4>
                  </div>
                  <div className="card-body">
                    {hoteles.hotel.map((hotel, index) => (
                      <div key={index} className="mb-3">
                        <p>
                          <strong>Nombre del hotel:</strong> {hotel.nombre}
                        </p>
                        <p>
                          <strong>Categoría:</strong> {hotel.categoria_hotel}{" "}
                          estrellas
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Precios */}
      {precios && (
        <div className="precios">
          <h3 className="text-center">Precios</h3>
          <Row>
            {[
              { tipo: "single", label: "Single" },
              { tipo: "doble", label: "Doble" },
              { tipo: "triple", label: "Triple" },
            ].map(({ tipo, label }) => (
              <Col md={6} key={tipo}>
                {renderPrecio(precios[`${tipo}_precio`])}
                <p>{label}</p>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ItemDetailContainer;
