
import './App.css';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Main from './Generales/Main';
import FormPays from './Components/FormPays';
import Payments from './Components/Payments';
import Navegacion from './Generales/Navegacion';
import FormReservation from './Components/FormReservation';
import ListReservation from './Components/ListReservation';
import FullCalendarApp from './Components/Schedule';
import FormReservationUpdate from './Components/FormReservationUpdate';
import Search from './Components/Search';
import Income from './Components/Income';
import SearchHole from './Components/SearchHole';
function App() {
  return (
    <>
    <Navegacion/>
    <BrowserRouter>
      <Routes>
        <Route path="/reservas" exact element={<ListReservation/>}/>
        <Route path="/reservas/nueva" element={<FormReservation/>}/>
        <Route path="/reservas/buscarhueco" element={<SearchHole/>}/>
        <Route path="/reservas/editar/:slug" element={<FormReservationUpdate/>}/>
        <Route path="/reservas/pagos/:slug" element={<FormPays/>}/>
        <Route path="/calendario" element={<FullCalendarApp/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/recaudacion" element={<Income/>}/>

      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
