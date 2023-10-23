import React from 'react'
import {Table }from 'react-bootstrap';

function Payments(props) {
    const { payments } = props;
  
    return (
        <div>
            {/* <header> */}
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Moneda</th>
                            <th>Tipo de Pago</th>
                            <th>Comprobante</th>
                            {/* <th>F. Verific.</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(item => (
                            <tr key={item.id}>
                                <td >{item.id}</td>
                                <td>{item.fecha_pago}</td>
                                <td>{item.monto}</td>
                                <td>{item.moneda_pago}</td>
                                <td>{item.tipo_pago}</td>
                                <td><a href={`${item.comprobante}`}>ver</a> </td>
                                {/* <td>{item.fecha_verificacion}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            {/* </header> */}
        </div>
    )
}

export default Payments;
