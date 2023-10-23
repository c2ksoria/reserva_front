import React from "react";
import {Col, Row, Container} from 'react-bootstrap'

function FiltroPorEstatus(props) {
  const handleChange = (e) => {
    props.onEstatusFilterChange(e.target.value);
  };

  return (
    <Container>
      <Row>

    <Col>
    
      <h4>Filtros Estatus </h4>
      <label>
        <input type="radio" value="Presupuesto" name="estatus" onChange={handleChange} />
        Presupuesto
      </label>
      <label>
        <input type="radio" value="Activa" name="estatus" onChange={handleChange} />
        Activa
      </label>
      <label>
        <input type="radio" value="Suspendida" name="estatus" onChange={handleChange} />
        Suspendida
      </label>
      <label>
        <input type="radio" value="CheckIn" name="estatus" onChange={handleChange} />
        CheckIn
      </label>
      <label>
        <input type="radio" value="Finalizada" name="estatus" onChange={handleChange} />
        Finalizada
      </label>
    </Col>
    <Col>
    <h4>Filtros </h4>
      <label>
        <input type="radio" value="Presupuesto" name="estatus" onChange={handleChange} />
        Presupuesto
      </label>
      <label>
        <input type="radio" value="Activa" name="estatus" onChange={handleChange} />
        Activa
      </label>
      <label>
        <input type="radio" value="Suspendida" name="estatus" onChange={handleChange} />
        Suspendida
      </label>
      <label>
        <input type="radio" value="CheckIn" name="estatus" onChange={handleChange} />
        CheckIn
      </label>
      <label>
        <input type="radio" value="Finalizada" name="estatus" onChange={handleChange} />
        Finalizada
      </label>
    </Col>
      </Row>
    </Container>
  );
}

export default FiltroPorEstatus;
