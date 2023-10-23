import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Alert, Container } from 'react-bootstrap'

export default function Search({ test, loading, setData}) {

    const [itemToSearch, setItem] = useState("")
    
    
    // useEffect(() => {
        
    // }, [])
    const SearchHandler = () => {
        // console.log(itemToSearch)
        test(itemToSearch)
    }
    const Limpiar = () => {
        // console.log(itemToSearch)
        test([])
        focusInput()
        setItem("")
        setData([])
        
    }

    const ChangeHandler = e => {
        setItem(e.target.value)
        // console.log("variable almacenada")
    }

    function focusInput() {
        // if(setFocus)
        // {
        //     setFocus(true)
        // }
        document.getElementById("texto").focus();
    }
    
    function renderAlert(){
        return(
            <>
            <Alert color="danger">Favor de ingresar texto válido...</Alert>
         </>
        )
    }

    const processEvent = (event)=>{
        if (event.key === 'Enter') {
            // 👇 Get input value
            console.log("pulsaron un enter...")
            // ChangeHandler(event)
            if (event.target.value!="")
            {
                console.log("el texto no estaba vacio....")

                SearchHandler()
            }
            else
            {    
                renderAlert() // ver como hacer para que un componente herede la posibilidad de lanzar un alerta
            }
        }
    }
    const handleKeyDown = (event) => {
        // console.log("entré al key---")
        processEvent(event)
    };
    // focusInput()
    const html = (
        <React.Fragment key="search">
            <Container>
                <h1>
                    Buscar Reservas
                </h1>
            </Container>

            <Row>
                <Col key='1'>
                    <div className='containerInput'>
                        <input
                            // ref={ref}
                            className='form-control'
                            value={itemToSearch}
                            placeholder='Ingresar el nombre de la reserva'
                            onChange={ChangeHandler}
                            onKeyDown={handleKeyDown}
                            id="texto"
                            autoFocus
                            onFocus={focusInput}
                            disabled ={loading}
                        />
                    </div>
                </Col>
                <Col key='2' xs={2}>
                    <Button  onClick={SearchHandler} >Buscar Reserva</Button>

                </Col>
                <Col key = '3' xs={6}>
                    <Button onClick={Limpiar}>Limpiar</Button>

                </Col>

            </Row>
        </React.Fragment>
    );
    return [html];
};

