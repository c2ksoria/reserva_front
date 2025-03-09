import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Payments from './Payments';
import {Row, Col, Container }from 'react-bootstrap';



function FormPays() {
    const params = useParams()
    const { slug } = params
    const [formPayment, setForm] = useState(null);
    const [payments, setPayments] = useState([]);

    let Error = 201;
    const limpiarFormulario = () => {
        const form = document.querySelector('form');
        form.reset();
    }
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/payments/form');
            const data = await response.json();
            setForm(data.form_data);
            // console.log(data.form_data)

        }

        fetchData();
    }, []);

    async function fetchPayments() {
        const response = await fetch(`http://localhost:8000/api/reservations/payments/?reserva=${slug}`);
        const data = await response.json();
        setPayments(data);
        console.log(data)

    }
    useEffect(() => {


        fetchPayments();
    }, [slug]);

    const handlerForm = async (event) => {
        event.preventDefault()
        console.log("listo para enviar")
        const formData = new FormData(event.target);
        formData.append('reserva', slug);


        const response = await fetch('http://localhost:8000/api/reservations/payments/', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.status !== Error) {
                    response.json().then(data => {
                        // Mostrar los errores en alertas
                        alert(`Error ${response.status}: ${JSON.stringify(data)}`);
                    });
                } else {
                    // Los datos se crearon correctamente
                    response.json().then(data => {
                        // Mostrar mensaje de éxito en una alerta
                        alert('Los datos se crearon correctamente');
                        fetchPayments();
                        limpiarFormulario();
                    });
                }
            })
            .catch(error => {
                console.error('Hubo un error al enviar los datos', error);
            });
    }
    return (
        <>
        <Container>
            <Row>

                <Col xs={4}>
                <h4>Agregar un Nuevo Pago</h4>
                            <form onSubmit={handlerForm} encType="multipart/form-data">
                                {formPayment && <div dangerouslySetInnerHTML={{ __html: formPayment }} />}
                                <button type="submit" >Enviar</button>
                            </form>
                
                </Col>
                <Col xs={6}>
                <h4>Listado de Pagos</h4>
                            <Payments payments={payments} />
                </Col>
            </Row>
        </Container>
        </>
                    
           

 





          
            
    )
}

export default FormPays
