import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import Navegacion from "./plantilla/Navegacion";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";
import { db } from "./firebase";

function App() {
  
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion />
        <Routes>
          <Route exact path="/" element={<ListadoEmpleados db={db}/>} />
          <Route exact path="/agregar" element={<AgregarEmpleado db={db}/>}/>
          <Route exact path="/editar/:id" element={<EditarEmpleado db={db}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
