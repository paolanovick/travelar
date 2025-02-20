/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "./Carousel"; // Asegúrate de tener el componente del carrusel
import Footer from "./Footer"; // Asegúrate de tener tu footer
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div>
      {/* Carousel */}
      <Carousel />

      {/* Quiénes somos */}
      <section
        style={{
          padding: "30px",
          textAlign: "center",
          borderBottom: "0.5px solid #ffffff",
        }}
      >
        <h2 style={{ padding: "50px", textAlign: "center" }}>
          ¿Quiénes somos?
        </h2>
        <p>
          En <strong> HUELLA AUSTRAL </strong>, somos más que una agencia de
          viajes, somos proveedores de experiencias que te acercan a la esencia
          del Fin del Mundo. 🌍✨
        </p>
        <p>
          {" "}
          Nuestro compromiso es ofrecerte viajes auténticos y personalizados que
          te conecten con la naturaleza, la cultura y la magia de la Patagonia,
          una de las regiones más impresionantes y vívidas del planeta. Desde el
          imponente Parque Nacional Los Glaciares hasta las costas de Tierra del
          Fuego, cada uno de nuestros destinos es una invitación a explorar el
          espíritu más puro de la tierra austral. Explora lo esencial. Viví lo
          simple. Esa es nuestra filosofía. Creemos que los momentos más
          trascendentes se encuentran en lo simple, en lo natural, en lo
          genuino.{" "}
        </p>
        <p>
          {" "}
          Queremos que vivas el momento, sin distracciones, en un entorno único
          e inigualable, con experiencias que quedarán grabadas en tu memoria
          para siempre. Con más de 10 años de experiencia en la industria, en
          HUELLA AUSTRAL nos enorgullece brindarte atención personalizada,
          cuidando cada detalle para que tu aventura sea única. Ya sea que
          busques una expedición de trekking, un recorrido guiado o un viaje de
          relax, te ofrecemos todo lo necesario para que vivas una experiencia
          sin igual. <strong> HUELLA AUSTRAL </strong>{" "}
        </p>{" "}
        <p> Conectamos viajeros con la magia del Fin del Mundo. 🏔️✨</p>
      </section>
    </div>
  );
};

export default Inicio;
