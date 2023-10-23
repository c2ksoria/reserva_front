import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import OrdenBy from '../Generales/OrderFunctions';

function IncomeList({ datos, setDatos }) {
    console.log(datos)
    // const [sumaOk, setSumaok] = useState(false)
    const [totales, setTotales] = useState([])

    function sumar(data) {
        // console.log("data: ", data)
        var sumaDolares = 0

        var sumaPesos = 0
        let cantReservas= data.length
        let nochesTotales = 0
        let cantPersonas = 0

        for (let index = 0; index < data.length; index++) {
            let cantidadPagos = data[index]['pagos']
            nochesTotales = nochesTotales + data[index]['cantidad_noches']
            cantPersonas = cantPersonas + data[index]['cantidad_personas']

            for (let index1 = 0; index1 < cantidadPagos.length; index1++) {
                if (cantidadPagos[index1]['moneda_pago'] === 'Pesos') {
                    let monto = Number(cantidadPagos[index1]['monto'])
                    // console.log("monto Pesos: ", monto)
                    sumaPesos = sumaPesos + monto
                }
            }
            for (let index1 = 0; index1 < cantidadPagos.length; index1++) {
                if (cantidadPagos[index1]['moneda_pago'] === 'Dolares') {
                    let monto = Number(cantidadPagos[index1]['monto'])
                    // console.log("monto Dolares: ", monto)
                    sumaDolares = sumaDolares + monto

                }
            }


        }

        let paragrabar = [sumaPesos, sumaDolares, cantReservas, nochesTotales, cantPersonas]
        console.log(paragrabar)
        return paragrabar
        // setTotales(paragrabar)
    }



    function renderData (pesos, dolares) {
        let data = "";
        if (pesos>0) {

            data=pesos
        }
        else{
            data= dolares + "U$D"
        }
        // console.log(data)
        return data
      };

    function llamada (){
        OrdenBy(datos,setDatos)
    }
    useEffect(() => {
        console.log("entró al useeffect")
        let xx = sumar(datos)
        setTotales(xx)
    }, [datos])



    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs>
                    <Table striped bordered hover size='sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre y Apellido</th>
                                <th>Fecha C/I</th>
                                <th>Fecha C/O</th>
                                <th>Noches</th>
                                <th>Origen</th>
                                <th>Presupuesto</th>
                                <th>Pagos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map(item => (
                                <tr key={item.id}>

                                    <th><Link to={`/reservas/editar/${item.id}`}>{item.id}</Link></th>
                                    <th>{item.nombre_apellido}</th>
                                    <th>{item.fecha_ingreso}</th>
                                    <th>{item.fecha_egreso}</th>
                                    <th>{item.cantidad_noches}</th>
                                    <th>{item.origen_reserva.nombre}</th>
                                    <th>{renderData(item.presupuesto_pesos, item.presupuesto_dolares)}</th>
                                    <th>



                                        {item.pagos.map(item1 => (

                                                <a key = {item1.id}>{item1.monto} /</a>

                                        ))}


                                    </th>


                                </tr>

                            ))}

                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Totales</h4>
                    <Table>
                        <thead>
                            <tr>
                                <th>Pesos</th>
                                <th>Dolares</th>
                                <th>Cantidad de Reservas</th>
                                <th>Noche Totales</th>
                                <th>Huéspedes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key='1' >

                                    {
                                    totales &&
                                    <>
                                    <th>
                                          {totales[0]}
                                    </th>
                                    <th>
                                          {totales[1]}
                                    </th>
                                    <th>
                                          {totales[2]}
                                    </th>
                                    <th>
                                          {totales[3]}
                                    </th>
                                    <th>
                                          {totales[4]}
                                    </th>
                                    </>
                                    }

                            </tr>
                        </tbody>
                    </Table>

                </Col>
            </Row>

            {/* {
                datos && <Button onClick={llamada}>Ordenar</Button>
            } */}
        </Container>
    )
}

export default IncomeList;