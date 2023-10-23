import React, { useState, useEffect } from 'react'
import { Alert, Button, Container, Row, Col } from 'react-bootstrap';
import IncomeList from './IncomeList';
function Income() {
  const meses = [{ 'id': 1, 'nombre': 'Enero' }, { 'id': 2, 'nombre': 'Febrero' }, { 'id': 3, 'nombre': 'Marzo' }, { 'id': 4, 'nombre': 'Abril' }, { 'id': 5, 'nombre': 'Mayo' }, { 'id': 6, 'nombre': 'Junio' }, { 'id': 7, 'nombre': 'Julio' }, { 'id': 8, 'nombre': 'Agosto' }, { 'id': 9, 'nombre': 'Septiembre' }, { 'id': 10, 'nombre': 'Octubre' }, { 'id': 11, 'nombre': 'Noviembre' }, { 'id': 12, 'nombre': 'Diciembre' }]
  // for (let index = 0; index < fechas.length; index++) {
  //   console.log(fechas[index])

  // }
  const [datos, setDatos] = useState([])
  const [data, setData] = useState([])
  const [anio, setAnio] = useState(0)
  const [mes, setMes] = useState(0)
  const [comercio, setComercio] = useState(0)

  const [error1, setError] = useState(false)

  async function consulta() {
    const response = await fetch("http://127.0.0.1:8000/api/commercial")
    const data2 = await response.json();
    // console.log(data)
    separarComercios(data2)

  }
  async function get_recaudacion() {
    const response = await fetch(`http://127.0.0.1:8000/api/montos?idCommercial=${comercio}&idMes=${mes}&idEstatus=2,4,19`)
    const data1 = await response.json();
    setData(data1)
    console.log("Recaudación: ",data1)
  }


  function separarComercios(data) {
    const separados = []
    for (let index = 0; index < data.length; index++) {
      separados.push({ 'id': data[index].id, 'nombre': data[index].nombre });
    }
    setDatos(separados);
    // console.log(datos)
  }
  useEffect(() => {
    consulta()


  }, [])

  const mostrar = (e) => {
    e.preventDefault();
    if (anio == 0 | mes == 0 | comercio == 0) {
      setError(true)

    }
    else {
      setError(false)
      get_recaudacion()
    }



    // console.log(comercio, mes, anio)
    // console.log("estado error: ", error1)
  }
  const handlerCommercio = (id) => {
    // console.log(id)
    setComercio(id)

  }
  const handlerMes = (id) => {
    // console.log(id)
    setMes(id)
  }

  const handlerAnio = (id) => {
    // console.log(id)
    setAnio(id)
  }

  return (
    <>

      <Container>
        <h1>
        Ingresos
        </h1>
      </Container>


      <form className='form-control' onSubmit={mostrar}>
        <Container>

          <Row>
            <label >Elegir un Comercio</label>
          </Row>
          <Row>
            <Col>

              {
                datos &&
                <select id='Comercio' name="Uno" onChange={event => handlerCommercio(event.target.value)} defaultValue={comercio}>
                  <option value={"0"} >Favor de elegir un Comercio</option>
                  {
                    datos.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>{item.nombre}</option>
                      );
                    })
                  }
                </select>
              }
            </Col>
            <Col>

              <label>Mes</label>
              <select id='Mes' name="Dos" onChange={event => handlerMes(event.target.value)} defaultValue={mes}>
                <option value={"0"} >Favor de elegir un mes</option>
                {
                  meses.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>{item.nombre}</option>
                    );
                  })
                }
              </select>
              <label>Mes</label>

            </Col>
            <Col>

              <select id='Año' name="Tres" onChange={event => handlerAnio(event.target.value)}>

                <option value='0'>Favor de Elegir un año</option>
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>

              </select>


              <br />
            </Col>
              <Col>
                <Button type="submit" >Consultar</Button>
              </Col>

          </Row>

        </Container>
      </form>
      {
        error1 && <Alert>Favor de completar los campos</Alert>
      }

      {data &&  <IncomeList datos={data} setDatos={setDatos}/>}
    
    </>

  )
}

export default Income;