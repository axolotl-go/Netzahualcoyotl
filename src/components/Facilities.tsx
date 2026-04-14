import React from "react";
import ModelViewer from "./ModelViewer";

const data = [
  {
    title: "Biblioteca",
    url: "/Modelos/Biblioteca_integradora.fbx",
  },
  {
    title: "Canchas Deportivas",
    url: "/Modelos/cancha_integradora.fbx",
  },
  {
    title: "laboratorio",
    url: "/Modelos/lab_integradora.fbx",
  },
  {
    title: "Salon",
    url: "/Modelos/Salon_integradora.fbx",
  },
];

const Facilities = () => {
  return (
    <section className="py-24 px-6 lg:px-20 bg-white" id="instalaciones">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-primary text-sm font-black uppercase tracking-[0.3em]">
          Infraestructura
        </h2>
        <h3 className="text-4xl lg:text-5xl font-900 text-academic-charcoal">
          Instalaciones de Primer Nivel
        </h3>
        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item, index) => (
          <ModelViewer
            key={index}
            url={item.url}
            nameModel={item.title}
            scaleModel={50}
          />
        ))}
      </div>
    </section>
  );
};

export default Facilities;
