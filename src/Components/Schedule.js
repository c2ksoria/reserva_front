import React, { useState, useEffect } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Container, Col, Row } from 'react-bootstrap';
import interactionPlugin from '@fullcalendar/interaction';
import { procesarFechas, getRandomColor, BuscarComercios } from './SubComponents/UsualFunctions';

// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
const valor = []

function FullCalendarApp() {
  const [events, setEvents] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);
  const [fechas, setFechas] = useState([]);

  const [estados, setEstados] = useState([])
  const [comercios, setComercios] = useState([])
  const [estadosUpdate, setEstadosUpdate] = useState("")
  const [comerciosUpdadate, setComerciosUpdate] = useState("")
  const [toSend, setToSend]= useState(false)

  let variable = ""
  const initComercios = false
  const initEstados = false

  


  const get_data = async (fecha_inicio, fecha_fin, come, estados_x1) => {
    console.log("ejecutando get_data")
    // console.log(comerciosUpdadate, estadosUpdate)
    let query = `http://127.0.0.1:8000/api/list/?fecha_prefijada=${fecha_inicio},${fecha_fin}&estatus=${estados_x1}&comercio=${come}`
    // console.log(query)
    const datos = await fetch(query)
    const devolver = await datos.json()
    console.log(devolver)
    // console.log("Cantidad de datos recibidos: ", devolver.length)

    const array_datos_mostrar = []

    // const propiedades = [];

    if (devolver != []) {
      devolver.map(item => {


        // if (item.estatus.id === 2 || item.estatus.id === 4 || item.estatus.id ===5)

        array_datos_mostrar.push({ "id": item.id, "title": item.propiedad.nombre + " - " + item.cantidad_noches + "n - " + item.cantidad_personas + "p - " + item.nombre_apellido, "start": item.fecha_ingreso.substring(0, 10) + "T" + item.hora_checkin, "end": item.fecha_egreso.substring(0, 10) + "T" + item.hora_checkout, "url": `http://127.0.0.1:3000/reservas/editar/${item.id}`, "color": getRandomColor(), "slotDuration": '02:00' })
        return 0
      })
      setEvents(array_datos_mostrar)
      // setEvents(eventos)
      // console.log("eventos...")
      // console.log(array_datos_mostrar)
      // console.log(eventos)
    }

  }

  useEffect(() => {
    console.log("Paso 1... UseEffect")
   
    if (firstLoad==false){
      async function llamada(){
        await mostrarComercios()
      }
      mostrarEstados()
      llamada()
      setFirstLoad(true)
    }

      procesarIdComercios()
      procesarIdEstados()

      if(toSend)
      {
        get_data(fechas[0], fechas[1], comerciosUpdadate, estadosUpdate)
        setToSend(false)
      }


    console.log("fin useEffect")

  },[toSend, firstLoad])
  


  function handleDatesSet(args) {

    console.log("-----")
    const fecha_start = new Date(args.start);
    console.log(fecha_start.getUTCDate())
    console.log("-----")
    // get_data()

  }

  function getDateInfo(args) {
    let [fecha_inicio, fecha_fin] = procesarFechas(args)
    setFechas([fecha_inicio, fecha_fin])
  }

  const handlerChangedComercios = (newState) =>{
    const updatedCheckboxes = comercios.map((checkbox) =>
      checkbox.nombreKey === newState ? { ...checkbox, check: !checkbox.check } : checkbox
    );
    setComercios(updatedCheckboxes);
    // procesarIdComercios();

  }

  const handlerEstadosChanged = (newState) =>{
    const updatedCheckboxes = estados.map((checkbox) =>
      checkbox.nombreKey === newState ? { ...checkbox, check: !checkbox.check } : checkbox
    );
    setEstados(updatedCheckboxes);
    procesarIdEstados();
  }
  async function mostrarComercios() {
    console.log("paso 2 - mostrarComercios")
    const xx = await BuscarComercios()
    const nuevoArreglo = xx.map(item => {
      return { ...item, check: initComercios, nombreKey: "comercio" + item.id };
    });
    setComercios(nuevoArreglo)
    procesarIdComercios()
  }

  function mostrarEstados() {
    let estados_1 = [
      { id: 1, nombre: "Presupuesto" },
      { id: 2, nombre: "Activa" },
      { id: 4, nombre: "CheckIn" },
      { id: 19, nombre: "Finalizada" },
    ]
    const nuevoArreglo = estados_1.map(item => {
      return { ...item, check: initEstados, nombreKey: "estado" + item.id };
    });
    setEstados(nuevoArreglo)
  }
  function mostrar(){
    setToSend(true)
    


    console.log(estados)
    console.log(estadosUpdate)
    console.log(comercios)
    console.log(comerciosUpdadate)

  }

  function procesarIdComercios() {
    console.log("Paso 4 - procesarIdComercios")
    const datosSeparadosPorComa = comercios
      .filter((dato) => dato.check) // Filtrar solo los datos que tienen la llave "check" como verdadera
      .map((dato) => dato.id) // Obtener solo el nombre de los datos filtrados
      .join(',');
      setComerciosUpdate(datosSeparadosPorComa)
      console.log("Paso 4 - datos separados por comas: ", datosSeparadosPorComa);
  }
  function procesarIdEstados() {
    console.log("Paso 3 - procesarIdEstados")

    const datosSeparadosPorComa = estados
      .filter((dato) => dato.check) // Filtrar solo los datos que tienen la llave "check" como verdadera
      .map((dato) => dato.id) // Obtener solo el nombre de los datos filtrados
      .join(',');
      setEstadosUpdate(datosSeparadosPorComa)
      console.log("Paso 3 - datos separados por comas: ", datosSeparadosPorComa);
  }
  return (

    <div className="App">
      <Row className="justify-content-left">
        <Col xs={2}>
          <Container>

            <div>
              <h4>
                Filtros
              </h4>
              <h5>
                Estados
              </h5>
              {/* <div>
                  <label>
                    <input
                      type="checkbox"
                      value="1"
                      onChange={handlerChanged}
                    // checked={checkboxValues.includes("opcion1")}
                    />
                    Presupuesto
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="2"
                      onChange={handlerChanged}
                    // checked={checkboxValues.includes("opcion2")}
                    />
                    Activa
                  </label>
                </div> */}
              {/* <div>
                  <label>
                    <input
                      type="checkbox"
                      value="4"
                      onChange={handlerChanged}
                    // checked={checkboxValues.includes("opcion3")}
                    />
                    CheckIn
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="19"
                      onChange={handlerChanged}
                    // checked={checkboxValues.includes("opcion3")}
                    />
                    Finalizada
                  </label>
                </div> */}
              <div>
                <h5>
                  Estados
                </h5>
                {
                  comercios &&
                  <div>
                    {comercios.map((data) => {
                      return (
                        <Row key={data.nombreKey}>
                          <label>
                            <input
                              type="checkbox"
                              value={data.id}
                              checked={data.check}
                              onChange={() => handlerChangedComercios(data.nombreKey)}
                            />
                            {data.nombre}
                          </label>
                        </Row>
                      )
                    })}
                  </div>
                }
              </div>
            </div>
            <div>
              <h5>
                Comercios
              </h5>
              {
                comercios &&
                <div>
                  {estados.map((data) => {
                    return (
                      <Row key={data.nombreKey}>
                        <label>
                          <input
                            type="checkbox"
                            value={data.id}
                            checked={data.check}
                            onChange={() => handlerEstadosChanged(data.nombreKey)}
                          />
                          {data.nombre}
                        </label>
                      </Row>
                    )
                  })}
                </div>
              }
              <div>

                <Button onClick={mostrar}>
                  Filtrar
                </Button>
              </div>
            </div>
          </Container>
        </Col >
        <Col xs={8}>

          <Container>
            {/* <Button onClick={test}></Button> */}

            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              events={events}
              initialView="dayGridMonth"
              // allDay= {true}
              headerToolbar={{
                'left': 'prev,next today',
                'center': 'title',
                'right': 'dayGridMonth'
              }}
              // dateClick={(e) => console.log(e)}
              eventClick={(e) => console.log(e.event)}
              datesSet={(e) => getDateInfo(e)}
              selectable={true}
              height="auto"
              displayEventTime={false}
            // slotDuration={'01:00:00'}
            // displayEventTime={true}
            // timeFormat= {'HH(:mm)'}

            />
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default FullCalendarApp;