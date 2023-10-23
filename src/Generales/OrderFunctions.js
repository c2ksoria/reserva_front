import React from 'react';

const Ordenador = ({ tipoOrden, ordenAscendente, setOrdenAscendente, setAscCheckin, ordenAscCheckin, setEstado, ordenEstado, datos1, setDatos }) => {
  let a_ordenar = [...datos1];

  if (tipoOrden === "id") {
    if (ordenAscendente) {
      a_ordenar.sort((a, b) => a.id - b.id);
      setOrdenAscendente(false);
    } else {
      a_ordenar.sort((a, b) => b.id - a.id);
      setOrdenAscendente(true);
    }
  } else if (tipoOrden === "fechaCheckin") {
    if (ordenAscCheckin) {
      a_ordenar.sort((a, b) => new Date(a.fecha_ingreso) - new Date(b.fecha_ingreso));
      setAscCheckin(false);
    } else {
      a_ordenar.sort((a, b) => new Date(b.fecha_ingreso) - new Date(a.fecha_ingreso));
      setAscCheckin(true);
    }
  } else if (tipoOrden === "estado") {
    if (ordenEstado) {
      a_ordenar.sort((a, b) => b.estatus.id - a.estatus.id);
      setEstado(false);
    } else {
      a_ordenar.sort((a, b) => a.estatus.id - b.estatus.id);
      setEstado(true);
    }
  }

  setDatos(a_ordenar);
};

function OrdenBy (datos,setDatos) {
    console.log(setDatos)
    let datosActuales = [...datos]
    datosActuales.sort((a, b) => new Date(a.fecha_ingreso) - new Date(b.fecha_ingreso));
    console.log(datosActuales)
    setDatos(datosActuales)
    console.log(setDatos)


};


export default OrdenBy;

