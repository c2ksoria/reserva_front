import React, { Component, useState, useEffect } from 'react'
import { BuscarComercios, BuscarPropiedadesdeComercios, consulta_hueco, marcarDisponibilidad } from './SubComponents/UsualFunctions'
import { Button, Container, Col, Row, Form, ListGroup } from 'react-bootstrap'

function SearchHole() {
    const valor = []
    const [comercios, setComercios] = useState([])
    const [propiedades, setPropiedades] = useState([])
    const [selecciones, setSelecciones] = useState([]); // Usamos un objeto para rastrear los checkboxes seleccionados.
    const [checkProp, setCheckProp] = useState([]); // Usamos un objeto para rastrear los checkboxes seleccionados.
    const [fechas, setFechas] = useState([]);
    const [showFree, setShowFree] = useState([]);

    const handlerChanged = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelecciones([...selecciones, value]);
        } else {
            setSelecciones(selecciones.filter(item => item !== value));
        }
    };
    const handlerChanged1 = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckProp([...checkProp, value]);
        } else {
            setCheckProp(checkProp.filter(item => item !== value));
        }
    };

    const handleFechaChange = (index, value) => {
        // console.log(index, value.target.value)
        // Clona el arreglo actual de fechas para evitar mutar el estado directamente
        const nuevasFechas = [...fechas];
        nuevasFechas[index] = value.target.value;
        setFechas(nuevasFechas);
    };

    async function mostrarComercios() {
        const xx = await BuscarComercios()
        setComercios(xx)
    }
    const buscarHuecos = async (e) => {
        e.preventDefault()
        // console.log("buscando huecos...")
        // console.log(propiedades)
        // console.log(checkProp)

        const cadena = checkProp.join(',')
        let hueco = await consulta_hueco(cadena, fechas[0], fechas[1])
        // console.log("resultados finales", hueco)
        let nuevos_datos = marcarDisponibilidad(propiedades, hueco)
        console.log("para mostrar:", nuevos_datos)
        setShowFree(nuevos_datos)
    }


    const mostrarPropiedades = async (e) => {
        e.preventDefault()
        // console.log(selecciones)
        const cadena = selecciones.join(',')
        // console.log(cadena)
        let prop = await BuscarPropiedadesdeComercios(cadena)
        setPropiedades(prop)
    }

    useEffect(() => {
        mostrarComercios()

    }, [propiedades])


    return (
        <>
        <Container>

        <h1>
            Buscar fechas disponibles
        </h1>
        </Container>
            <div>
                <Container>
                    <Row>

                        <Col xs={3}>
                            <form className='form-control' onSubmit={mostrarPropiedades}>

                                <Container>


                                    {
                                        comercios &&
                                        <div>
                                            {comercios.map((data) => {
                                                return (
                                                    <Row>
                                                        <label key={data.id}>
                                                            <input
                                                                type="checkbox"
                                                                value={data.id}
                                                                onChange={handlerChanged}
                                                            // checked={checkboxValues.includes("opcion1")}
                                                            />
                                                            {data.nombre}
                                                        </label>
                                                    </Row>

                                                )
                                            })
                                            }

                                        </div>
                                    }
                                    <Button type="submit">
                                        Buscar Propiedades
                                    </Button>
                                </Container>

                            </form>

                        </Col >
                        <Col xs={4}>
                            <form className='form-control' onSubmit={buscarHuecos}>
                                <Row>
                                    <Col xs={4}>
                                        <Container>


                                            {
                                                propiedades &&
                                                <div>
                                                    {propiedades.map((data) => {
                                                        return (
                                                            <Row>

                                                                <label key={data.id}>
                                                                    <input
                                                                        type="checkbox"
                                                                        value={data.id}
                                                                        onChange={handlerChanged1}
                                                                    // checked={checkboxValues.includes("opcion1")}
                                                                    />
                                                                    {data.nombre}
                                                                </label>
                                                            </Row>

                                                        )
                                                    })
                                                    }

                                                </div>
                                            }

                                        </Container>
                                    </Col >
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Container>
                                                    <div className="row">
                                                        <div >
                                                            <Form.Group controlId="dob">
                                                                <Form.Label>Fecha de Ingreso</Form.Label>
                                                                <Form.Control type="date" name="dob" placeholder="Ingresar Fecha" required onChange={(value) => handleFechaChange(0, value)} />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                </Container>
                                            </Col>
                                            <Col>
                                                <Container>
                                                    <div className="row">
                                                        <div >
                                                            <Form.Group controlId="dob">
                                                                <Form.Label>Fecha de Egreso</Form.Label>
                                                                <Form.Control type="date" name="dob" placeholder="Ingresar Fecha" required onChange={(value) => handleFechaChange(1, value)} />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                </Container>
                                            </Col>
                                    <Col >
                                        <Button type="submit">
                                            Consultar
                                        </Button>
                                    </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                        <Col>
                        <ListGroup>

                        {
                            showFree &&
                            showFree.map((item) => {
                                return (
                                    <ListGroup.Item key={item.id}>{item.nombre} - {item.disponible ? 'Disponible' : 'Ocupado'}</ListGroup.Item>
                                )
                            })
                        }

                    </ListGroup>
                        </Col>
                    </Row>
                </Container>

                <div>



                </div >
                <div>
                    
                </div>
            </div >
        </>

    )

}
export default SearchHole;
