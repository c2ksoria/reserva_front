import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Table, Container, Col, Row, Alert, InputGroup, Button, Spinner } from 'react-bootstrap';
import moment from 'moment'
import ActionsNew from './ActionsNew';
// import FiltroPorEstatus from './FiltroPorEstatus'
import Search from './Search';
import Pagination_list from './Pagination_list';

function ListReservation() {
  const pageSize=50
  const mainUrl= 'http://127.0.0.1:8000/api/pagination/?page='
  const [records, setRecords] = useState(0)
  const [datos, setDatos] = useState([])
  const [ordenAscendente, setOrdenAscendente] = useState(true); // Estado para llevar el orden actual
  const [ordenAscCheckin, setAscCheckin] = useState(true); // Estado para llevar el orden actual
  const [ordenEstado, setEstado] = useState(true); // Estado para llevar el orden actual
  const [estatusFilter, setEstatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false)

  const [focusInput, setFocusInput] = useState(false);

  const searchText = "&nombre_apellido="
  // const inputRef = React.createRef();

  useEffect(() => {
    // if (focusInput) {
    //   inputRef.current.focus();
    //   setFocusInput(false); // Desactivar el enfoque después de enfocar
    // }
  }, [])


  const get_data1 = (data) => {
    console.log("data: ..... ", data)
    if (data!="")
    {
      setShowAlert(false)
    const text = mainUrl +1+'&page_size='+pageSize + searchText + data
    // console.log(text)
    get_data(text)
    }
    else{
     setShowAlert(true)
    }
  }
  const get_data2 = () => {

    const text = mainUrl+1+'&page_size='+pageSize
    console.log(text)
    get_data(text)
  }

  const get_data = async (url) => {
    console.log("ejecutando get_data a la url :", url)
    setIsLoading(true);
    const datos1 = await fetch(url)
    const devolver = await datos1.json()
    console.log(devolver)
    // console.log(devolver["estatus"]=="Finalizada")
    setDatos(devolver['results'])
    setRecords(devolver['count'])
    console.log("cantidad de registros",records)
    console.log(datos)
    setIsLoading(false);
    // setFocus(true)
  }
  const fetch_new_status = async (id, estado, prox) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id": id,
        "estado": estado,
        "accion": prox
      })
    };
    const datos_fetch = await fetch('http://127.0.0.1:8000/api/changestatus/', requestOptions)
    const datosJson = await datos_fetch.json()
    return datosJson['Data']
  }
  const handler_change_status = async (id_1, estado, accion) => {
    console.log(id_1)
    var xxxx = await fetch_new_status(id_1, estado, accion)
    console.log("--------")
    console.log(xxxx['status'])
    console.log("--------")
    // const xx = xxxx
    if (xxxx['status'] === 200) {
      console.log("entró al if...")
      const newState1 = datos.map((data) => {
        if (data.id === id_1) {
          return {
            ...data,
            estatus: { 'id': id_1, 'nombre': xxxx['nuevoEstado'] },
          }
        }
        // console.log("data modificada: ",data)
        return data
      })
      setDatos(newState1)
      console.log(newState1.length)
    }
    else {
      <>
        <Alert color="danger">Hubo un error...</Alert>

      </>
      console.log('Hubo un error inesperado...')
    }
  }
  const Ordenar = (tipoOrden) => {
    console.log(tipoOrden)
    let a_ordenar = [...datos];
    if (tipoOrden == "id") {

      if (ordenAscendente) {
        a_ordenar.sort((a, b) => a.id - b.id)
        setOrdenAscendente(false);

      }
      else {
        a_ordenar.sort((a, b) => b.id - a.id);
        setOrdenAscendente(true);
      }
    }
    else if (tipoOrden == "fechaCheckin") {
      console.log("entró al ordenamiento de las fechas")
      if (ordenAscCheckin) {
        a_ordenar.sort((a, b) => {
          const fechaA = new Date(a.fecha_ingreso);
          const fechaB = new Date(b.fecha_ingreso);
          return fechaA - fechaB;
        })
        setAscCheckin(false);

      }
      else {
        a_ordenar.sort((a, b) => {
          const fechaA = new Date(a.fecha_ingreso);
          const fechaB = new Date(b.fecha_ingreso);
          return fechaB - fechaA;
        });
        setAscCheckin(true);
      }

    }
    else if (tipoOrden == "estado") {
      console.log("entró al ordenamiento de estado")
      console.log(ordenEstado)
      if (ordenEstado) {
        console.log("entró al true")
        a_ordenar.sort((a, b) => b.estatus.id - a.estatus.id)
        setEstado(false);
      }
      if (ordenEstado === false) {
        console.log("entró al false")
        a_ordenar.sort((a, b) => a.estatus.id - b.estatus.id)
        setEstado(true);
      }


    }
    setDatos(a_ordenar)
  }
  // const handleEstatusFilterChange = (estatus) => {
  //   setEstatusFilter(estatus);
  //   console.log(estatus)
  // };

  return (

    <header >
      <Container>
        <Row >
          <Search test={get_data1} loading={isLoading} setFocus={setFocusInput} setData={setDatos}/>
        </Row>
        {isLoading ? <Spinner animation="grow"/>:  
        <Row className="justify-content-md-center">
          {/* <FiltroPorEstatus onEstatusFilterChange={handleEstatusFilterChange}/> */}
          <Col xs>
            <Table striped bordered hover size='sm'>
              <thead>
                <tr>
                  <th onClick={() => Ordenar("id")}>ID</th>
                  <th>Nombre</th>
                  <th>Propiedad</th>
                  <th onClick={() => Ordenar("fechaCheckin")}>Fecha C/I</th>
                  <th>Hora C/I</th>
                  <th>Fecha C/O</th>
                  <th>Hora C/O</th>
                  <th>Noches</th>
                  <th>Origen</th>
                  <th>$</th>
                  <th>U$D</th>
                  <th onClick={() => Ordenar("estado")}>Estado</th>
                  <th>Personas</th>
                  <th>Pagos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {datos.map(item => (
                  <tr key={item.id}>
                    <th>{item.id}</th>
                    <th><Link to={`/reservas/editar/${item.id}`}>{item.nombre_apellido}</Link> </th>
                    <th>{item.propiedad.nombre}</th>
                    <th>{moment(item.fecha_ingreso).format('DD-MM-YYYY')}</th>
                    <th>{item.hora_checkin}</th>
                    <th>{moment(item.fecha_egreso).format('DD-MM-YYYY')}</th>
                    <th>{item.hora_checkout}</th>
                    <th>{item.cantidad_noches}</th>
                    <th>{item.origen_reserva.nombre}</th>
                    <th>{item.presupuesto_pesos}</th>
                    <th>{item.presupuesto_dolares}</th>
                    <th>{item.estatus.nombre}</th>
                    <th>{item.cantidad_personas}</th>
                    <th><Link to={`/reservas/pagos/${item.id}`}>Ver</Link> </th>
                    <th><ActionsNew id={item.id} prueba={handler_change_status} estado={item.estatus.nombre} /></th>

                  </tr>

                ))}

              </tbody>
            </Table>
          </Col>
        </Row>}
      
      {/* <Pagination_list records = {records} recordsPerPage ={pageSize}/> */}
      <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
          Introducir datos válidos para la búsqueda
        </Alert>
      </Container>
    </header>
  )
}

export default ListReservation