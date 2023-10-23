import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row} from 'react-bootstrap';

var estados = [
    { 'id': 1, 'estado': 'Presupuesto', 'proximo_estado': [{ 'estado': 'Cancelar', 'accion': 'Cancelar', 'deshabilitado': true }, { 'estado': 'Activa', 'accion': 'Activar', 'deshabilitado': true }] },
    { 'id': 2, 'estado': 'Activa', 'proximo_estado': [{ 'estado': 'Checkin', 'accion': 'Checkin Ok', 'deshabilitado': true }, { 'estado': 'Suspendida', 'accion': 'Suspender', 'deshabilitado': true }] },
    { 'id': 2, 'estado': 'Suspendida', 'proximo_estado': [{ 'estado': 'Cancelar', 'accion': 'Cancelar', 'deshabilitado': true }, { 'estado': 'Activa', 'accion': 'Activar', 'deshabilitado': true }] },
    { 'id': 3, 'estado': 'Cancelada', 'proximo_estado': [] },
    { 'id': 4, 'estado': 'Checkin', 'proximo_estado': [{ 'estado': 'Finalizada', 'accion': 'Finalizar', 'deshabilitado': true }] },
    { 'id': 5, 'estado': 'Finalizada', 'proximo_estado': [] },
]

let acciones = [
    { 'id': 1, 'accion': 'Activar', 'desabilitado': true },
    { 'id': 2, 'accion': 'Suspender', 'desabilitado': true },
    { 'id': 3, 'accion': 'Cancelar', 'desabilitado': true },
    { 'id': 4, 'accion': 'Checkin OK', 'desabilitado': true },
    { 'id': 6, 'accion': 'Finalizar', 'desabilitado': true },]

export default function ActionsNew({ prueba, id, estado }) {

    var nuevas_acciones = []
    // console.log(id, estado)
    estados.map((item) => {
        if (item.estado === estado) {
            nuevas_acciones = item.proximo_estado
        }
    })
    for (let index = 0; index < nuevas_acciones.length; index++) {
        // console.log(nuevas_acciones[index])

    }
    // var acciones_finales = []
    // for (let index1 = 0; index1 < nuevas_acciones.length; index1++) {
    //     for (let index = 0; index < acciones.length; index++) {

    //         if (nuevas_acciones[index1] === acciones[index].accion) {
    //             var temp = acciones[index]
    //             temp.desabilitado = false
    //             acciones_finales.push(temp)
    //         }
    //     }
    // }
    // console.log(id, estado, acciones_finales)


    // Función para manejar el clic en el componente hijo
    const handleClick = (id_1, pestado, accion) => {
        // Invocar la función pasada como prop para manejar los resultados
        console.log(`Por ejecutar prueba..., id: ${id_1}, proximo estado: ${pestado}, accion: ${accion}`)
        prueba(id_1, accion, pestado)
        console.log("finalizado prueba..", id_1, pestado, accion)
    }

    return (
        <Container>
        <Row>
        {nuevas_acciones.map((item, id_1) => (
                <Col sm="auto" key={id_1}>
                <Button key={id_1} color="primary" onClick={()=>handleClick(id, item.accion, item.estado)}>{item.accion}</Button>
                
                </Col>
            ))}
        </Row>
            
        </Container>
    );
};

ActionsNew.propTypes = {
    prueba: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    // prox_estado: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
};