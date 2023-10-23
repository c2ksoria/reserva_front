import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Table, Container, Col, Row, Alert, Form, Button } from 'react-bootstrap';

const FormReservationUpdate = ({ id }) => {
  const [formReservationData, setForm] = useState('');
  let Error = 200
  const params = useParams()
  const { slug } = params

  useEffect(() => {

    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(`http://localhost:8000/reservations/update/${slug}`);
    const data = await response.json();
    setForm(data.form_data);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataToPut = {};
    console.log(formData.entries())
    for (const [key, value] of formData.entries()) {
      dataToPut[key] = isNaN(value) ? value : parseInt(value);
    }
    const response = await fetch(`http://localhost:8000/api/update/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToPut)
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
            fetchData();
            alert('La Reserva se actualizó correctamente');
          });
        }
      })
      .catch(error => {
        console.error('Hubo un error al enviar los datos', error);
      });

  };

  async function duplicateReservation() {

    console.log("duplicando...: ", slug)

    let datos = []
    const response = await fetch(`http://127.0.0.1:8000/api/duplicate-reservation/${slug}`)
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
            // console.log("respuesta desde el servidor: ",data)
            alert(`La Reserva se duplicó correctamente con id: ${data.new_reservation_id}`);
          });
        }
      })
      .catch(error => {
        console.error('Hubo un error al enviar los datos', error);
      });


  }


  return (
    <header className="App">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <h1>Actualizar Reserva</h1>

            {
              formReservationData &&
              <Form onSubmit={handleSubmit} className="mb-3">
                {formReservationData && <div dangerouslySetInnerHTML={{ __html: formReservationData }} />}
                <button type="submit">Enviar</button>
              </Form>
            }

          </Col>
          <Col>
            <h3>
              <div>
                <Container>

                  <Row>
                    <Col>
                      <Link to={`/reservas/pagos/${slug}`}>Ver Pagos</Link>
                    </Col>
                    <Col>

                    <Button onClick={() => duplicateReservation()}>Duplicar reserva</Button>
                    </Col>
                  </Row>
                  <Row xs={4} justify-content-center>

                  </Row>

                </Container>

              </div>
            </h3>
          </Col>

        </Row>


      </Container>

    </header>




  );
}
export default FormReservationUpdate
