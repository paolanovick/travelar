/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "react-bootstrap"; // Importa el componente de Bootstrap

const CarouselComponent = () => {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "100",
          margin: "0 auto", // Centra el carrusel horizontalmente
        }}
      >
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-img"
              src="https://www.cronista.com/files/image/297/297515/5ffe0c67b08d6.webp?oe=jpg"
              alt="Imagen 1"
            />
            <Carousel.Caption>
              <h3>Bienvenidos a Huella Austral</h3>
              <p>Proveedor de Experiencias en el Fin del Mundo </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 custom-img"
              src="https://www.infobae.com/resizer/v2/2XDN7M2ZINCNXMRK3VLBKXDK44.jpg?auth=006d347902a1cf6608a379151e3adfa6ce84957d6e1270e484a7aaf432bc88d9&smart=true&width=1200&height=900&quality=85"
              alt="Imagen 2"
            />
            <Carousel.Caption>
              <h3>Ofertas Especiales</h3>
              <p>Explora lo esencial. Viví lo simple.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 custom-img"
              src="https://media.staticontent.com/media/pictures/c71926b6-a531-4b0f-960b-a4927c9628cc"
              alt="Imagen 3"
            />
            <Carousel.Caption>
              <h3>Viajes Inolvidables</h3>
              <p>Vive una experiencia única con nosotros</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
};

export default CarouselComponent;
