/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { XMLParser } from "fast-xml-parser";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";



const ItemDetailContainer = () => {
  const [detalleProducto, setDetalleProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { idProducto } = useParams(); // Obtenemos el ID del producto de la URL

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

        console.log("jsonData:", jsonData);
        console.log("Estructura de paquetes:", jsonData?.root?.paquetes);

        const paquetes = jsonData?.root?.paquetes?.paquete;
        if (paquetes && paquetes.length > 0) {
          console.log("Productos en paquetes:", paquetes);
        } else {
          console.log("No se encontraron productos en 'paquetes'.");
        }

        // Verificar el valor de idProducto
        console.log("idProducto desde la URL:", idProducto);

        // Buscar el producto que coincida con el idProducto
        const producto = paquetes?.find((item) => {
          console.log("Verificando producto:", item);
          console.log(
            "Comparando idProducto con paquete_externo_id:",
            String(item.paquete_externo_id),
            String(idProducto)
          );
          return String(item.paquete_externo_id) === String(idProducto);
        });

        if (producto) {
          setDetalleProducto(producto);
        } else {
          setError("Producto no encontrado.");
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

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Extraemos los detalles adicionales del producto
  const {
    titulo,
    descripcion,
    precio,
    imagen_principal,
    detalles_adicionales,
    destinos,
    fecha_vigencia_desde,
    fecha_vigencia_hasta,
    incluye,
    hoteles,
    galeria_imagenes,
    edad_menores,
  } = detalleProducto || {};

  return (
    <Container className="item-detail-container">
      <h1 className="titulo-detalle text-center my-4">
        Detalle del Producto {idProducto}
      </h1>

      <Row className="producto-card">
        <Col md={6} className="descripcion">
          <Card>
            <Card.Body>
              <Card.Title>{titulo}</Card.Title>
              <Card.Text>{descripcion}</Card.Text>
              <p className="precio">
                <strong>Precio:</strong> ${precio}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {imagen_principal && (
          <Col md={6} className="imagen-principal">
            <Image src={imagen_principal} alt={titulo} fluid rounded />
          </Col>
        )}
      </Row>

      <div className="detalles-paquete mt-4">
        <h3>Detalles del paquete:</h3>
        <p>
          <strong>Fecha de vigencia:</strong> {fecha_vigencia_desde} a{" "}
          {fecha_vigencia_hasta}
        </p>

        {destinos && destinos.destino && destinos.destino.length > 0 && (
          <div className="destinos">
            <h4>Destinos:</h4>
            {destinos.destino.map((destino, index) => (
              <div key={index} className="destino-item">
                <p>
                  <strong>País:</strong> {destino.pais}
                </p>
                <p>
                  <strong>Ciudad:</strong> {destino.ciudad}
                </p>
              </div>
            ))}
          </div>
        )}

        {incluye && (
          <div className="incluye">
            <h4>Incluye:</h4>
            <div dangerouslySetInnerHTML={{ __html: incluye }} />
          </div>
        )}

        {hoteles && hoteles.hotel && hoteles.hotel.length > 0 && (
          <div className="hoteles">
            <h4>Hoteles:</h4>
            {hoteles.hotel.map((hotel, index) => (
              <div key={index} className="hotel-item">
                <p>
                  <strong>Nombre del hotel:</strong> {hotel.nombre}
                </p>
                <p>
                  <strong>Categoría del hotel:</strong> {hotel.categoria_hotel}*
                </p>
              </div>
            ))}
          </div>
        )}

        {galeria_imagenes && (
          <div className="galeria">
            <h4>Galería de imágenes:</h4>
            <Row>
              {Object.keys(galeria_imagenes).map((key, index) => (
                <Col key={index} xs={3}>
                  <Image
                    src={galeria_imagenes[key]}
                    alt={`Imagen ${index + 1}`}
                    fluid
                    rounded
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}

        <h3>Información adicional:</h3>
        <p>
          {detalles_adicionales || "No hay detalles adicionales disponibles."}
        </p>
        <p>
          <strong>Edad máxima para menores:</strong> {edad_menores} años
        </p>

        <Button variant="primary" className="boton-compra">
          Comprar ahora
        </Button>
      </div>
    </Container>
  );
};

export default ItemDetailContainer;