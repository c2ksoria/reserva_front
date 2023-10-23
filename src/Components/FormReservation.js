import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
const FormReservation = () => {
  const [formReservationData, setForm] = useState('');
  let Error = 201;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/reservations/form');
      const data = await response.json();
      setForm(data.form_data);
      // console.log(data.form_data)

    }
    fetchData();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data1 = {};
    for (const [key, value] of formData.entries()) {
      data1[key] = isNaN(value) ? value : parseInt(value);
    }
    // console.log(data1)

    const response = await fetch('http://localhost:8000/api/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data1)
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
            limpiarFormulario();
          });
        }
      })
      .catch(error => {
        console.error('Hubo un error al enviar los datos', error);
      });

  };
  const limpiarFormulario = () => {
    const form = document.querySelector('form');
    form.reset();
  }
  return (
    <div className="App">
    <header className="App-header">

      <Container fluid >
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <h1>Crear Reserva</h1>
            <form onSubmit={handleSubmit} className="mb-3">
              {formReservationData && <div dangerouslySetInnerHTML={{ __html: formReservationData }} />}
              <button type="submit">Enviar</button>
            </form>
          </Col>
        </Row>
      </Container>
    </header>
    </div>
  );
}
export default FormReservation
