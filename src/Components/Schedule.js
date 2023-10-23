import React, { useState, useEffect } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Container, Col, Row } from 'react-bootstrap';
import interactionPlugin from '@fullcalendar/interaction';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const valor = []

function FullCalendarApp() {
  const [events, setEvents] = useState([]);
  const [estatus, setEstatus] = useState("0");
  const [fechas,setFechas]= useState([]);


  const get_data = async (fecha_inicio, fecha_fin) => {
    // console.log("ejecutando get_data")
    // console.log(estatus)
    let query = `http://127.0.0.1:8000/api/list/?fecha_prefijada=${fecha_inicio},${fecha_fin}&estatus=${estatus}`
    // console.log(query)
    const datos = await fetch(query)
    const devolver = await datos.json()
    // console.log(devolver)
    console.log("Cantidad de datos recibidos: ", devolver.length)

    const array_datos_mostrar = []

    const propiedades = [];

    if (devolver !=[])
      {
      devolver.map(item => {


        // if (item.estatus.id === 2 || item.estatus.id === 4 || item.estatus.id ===5)
  
        array_datos_mostrar.push({ "id": item.id, "title": item.propiedad.nombre + " - " + item.cantidad_noches +"n - " + item.cantidad_personas + "p - " + item.nombre_apellido, "start": item.fecha_ingreso.substring(0, 10) + "T" + item.hora_checkin, "end": item.fecha_egreso.substring(0, 10) + "T" + item.hora_checkout, "url": `http://127.0.0.1:3000/reservas/editar/${item.id}`, "color": getRandomColor(), "slotDuration": '02:00' })
        return 0
      })
      setEvents(array_datos_mostrar)
      // setEvents(eventos)
      console.log("eventos...")
      console.log(array_datos_mostrar)
      // console.log(eventos)
    }
    
  }

  useEffect(() => {
    console.log("useEffect")
    if(fechas!=[] && estatus!="0")
      {
        get_data(fechas[0], fechas[1])
        console.log(fechas)
      }
    if(estatus=="0")
    {
      setEvents([])
    }
  }, [fechas, estatus])


  function handleDatesSet(args) {

    console.log("-----")
    const fecha_start = new Date(args.start);
    console.log(fecha_start.getUTCDate())
    console.log("-----")
    // get_data()

  }

  function getDateInfo(args){
    console.log("ingresando a getDateInfo...")
    let temporal_fecha_inicio = args.startStr
    let temporal_fecha_fin = args.endStr

    let fecha_inicio= (temporal_fecha_inicio.split('T'))[0]
    let fecha_fin= (temporal_fecha_fin.split('T'))[0]
    console.log(fecha_inicio, fecha_fin)
    // console.log(fecha_fin.split('T'))
    setFechas([fecha_inicio, fecha_fin])
    
    
  }

  const handlerChanged = (event) => {
    console.log("Valor: ", valor)
    const { value, checked } = event.target;
    if (checked) {
      valor.push(value)
      // console.log(estatus.find(item=> item==19))
    }
    else {
      const index = valor.indexOf(value)
      valor.splice(index, 1);
    }
    console.log(valor)
    let stringer = ""
    valor.map(item => stringer += item + ",")
    stringer = stringer.substring(0, stringer.length - 1);
    console.log(stringer)
    if (stringer=="")
      stringer="0"
    setEstatus(stringer)
    // console.log(stringer)
    // console.log(estatus)

  }
  return (

    <div className="App">
      <Row className="justify-content-left">
        <Col xs={2}>
          <Container>

        <div>
              <div>
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
              </div>
              <div>
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
              dateClick={(e) => console.log(e)}
              eventClick={(e) => console.log(e.event)}
              datesSet={(e) => getDateInfo(e)}
              selectable={true}
              height="auto"
              displayEventTime= {false}
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