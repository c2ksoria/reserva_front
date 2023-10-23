import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navegacion() {
    return (
        <>
            <Nav className="justify-content-center" activeKey="/home" expand='lg' bg="dark">
                <NavDropdown title="Reservas" id="nav-dropdown">
                    <NavDropdown.Item key="1" eventKey="4.1"href="/reservas">Listado</NavDropdown.Item>
                    <NavDropdown.Item key="2" eventKey="4.2" href="/reservas/nueva">Nueva Reserva</NavDropdown.Item>
                    <NavDropdown.Item key="3" eventKey="4.3" href="/reservas/buscarhueco">Buscar Hueco</NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                    <Nav.Link href="/calendario">Calendario</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/recaudacion">Recaudacion</Nav.Link>
                </Nav.Item>

            </Nav>
        </>
    );
}

export default Navegacion;