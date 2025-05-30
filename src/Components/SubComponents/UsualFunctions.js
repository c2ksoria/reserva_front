export async function BuscarComercios() {
    let datos = []
    const response = await fetch("http://127.0.0.1:8000/api/commercial")
    const data2 = await response.json()
    const datos_finales = separarComercios(data2)
    return (datos_finales)
}

function separarComercios(data) {
    const separados = []
    for (let index = 0; index < data.length; index++) {
        separados.push({ 'id': data[index].id, 'nombre': data[index].nombre });
    }
    let ordenados = separados.sort((a, b) => {
        // Compara los nombres en orden alfabético
        return a.nombre.localeCompare(b.nombre);
    });
    return ordenados

}

export function BuscarPropiedadesdeComercios(comercios) {
    let datos = []
    async function consulta(data) {
        const response = await fetch(`http://127.0.0.1:8000/api/propiedadeslist/?comercios=${data}`)
        const data2 = await response.json()
        // console.log(data2)
        const datos_finales = separarComercios(data2)
        return datos_finales
    }
    datos = consulta(comercios)
    // console.log(datos)

    return (datos)

}
export async function consulta_hueco(propiedades, fecha_inicial, fecha_final) {
    let datos = []
    const response = await fetch(`http://127.0.0.1:8000/api/hueco/?fecha_prefijada=${fecha_inicial},${fecha_final}&propiedades=${propiedades}`)
    const data2 = await response.json()
    console.log("Propiedades disponibles:",data2)
    return (data2)
}

export function marcarDisponibilidad(propiedades, reservas) {
    const propiedadesDisponibles = propiedades.map((propiedad) => {
      const coincideEnReservas = reservas.some((reserva) => reserva.propiedad === propiedad.nombre);
    //   console.log("hubo una coincidencia: ", reservas.propiedad)
      return { ...propiedad, disponible: !coincideEnReservas };
    });
    return propiedadesDisponibles;
  }

  export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  export function procesarFechas(data){
    console.log("ingresando a getDateInfo...")
    let temporal_fecha_inicio = data.startStr
    let temporal_fecha_fin = data.endStr

    let fecha_inicio= (temporal_fecha_inicio.split('T'))[0]
    let fecha_fin= (temporal_fecha_fin.split('T'))[0]
    console.log(fecha_inicio, fecha_fin)

    return [fecha_inicio, fecha_fin]

  }